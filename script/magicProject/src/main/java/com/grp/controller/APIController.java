package com.grp.controller;

import com.alibaba.fastjson.JSONObject;
import com.grp.util.MyThreadLocal;
import com.grp.util.Result;
import org.apache.commons.lang3.StringUtils;
import org.springframework.util.LinkedCaseInsensitiveMap;
import org.springframework.web.bind.annotation.*;
import org.ssssssss.magicapi.config.MappingHandlerMapping;
import org.ssssssss.magicapi.config.WebSocketSessionManager;
import org.ssssssss.magicapi.context.CookieContext;
import org.ssssssss.magicapi.context.RequestContext;
import org.ssssssss.magicapi.context.SessionContext;
import org.ssssssss.magicapi.model.*;
import org.ssssssss.magicapi.script.ScriptManager;
import org.ssssssss.magicapi.utils.JsonUtils;
import org.ssssssss.script.MagicScriptContext;
import org.ssssssss.script.MagicScriptDebugContext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.*;

import static org.ssssssss.magicapi.config.MessageType.BREAKPOINT;
import static org.ssssssss.magicapi.model.Constants.*;

/**
 * Controller for api
 */

@RestController
@CrossOrigin
@RequestMapping("/home")
public class APIController {
    private String code="";


    private String exePath="";

    /**
     * get running result for one schedule
     * @param uuid to find the schedule
     * @return running result
     */
    @RequestMapping(value = "/getres",method = {RequestMethod.GET, RequestMethod.POST})
    public Object getRunningRes(String uuid) {
        if (uuid==null || !uuid.matches("^[0-9a-zA-Z]{1,}$") || uuid.length()<30) {
            return Result.fail("Please input the right uuid");
        }
        getPyPath();
        String fileName=exePath+uuid+".txt";
        File file=new File(fileName);
        try {
            //Thread.sleep(5000);
            if (!file.exists()) {
                Result res=Result.succeed("Schedule "+uuid+" is running (if it exists)");
                res.setCode(100);
                return res;
            }
            else {
                return readFile(fileName);
            }
        }
        catch (Exception e) {
            return Result.fail(e.getMessage());
        }

    }

    /**
     * read result from txt file
     * @param fileName txt file name
     * @return result
     */
    private Result readFile(String fileName) {
        BufferedReader reader=null;
        String line, output = "";

        try {
            File file=new File(fileName);
            InputStream input = new FileInputStream(file);

            InputStreamReader inputStreamReader = new InputStreamReader(input);
            reader=new BufferedReader(inputStreamReader);

            while ((line = reader.readLine()) != null) {
                //result has been generated
                if (line.contains("---")) {
                    String strRes=reader.readLine();
                    JSONObject res=JSONObject.parseObject(strRes);
                    res.put("mid_msg",output);
                    return Result.succeed(res);
                }
                //exception occurred
                else if (line.contains("Exception") || line.contains("exception")) {
                    output=line;
                    return Result.fail(output);
                }
                else {
                    output+=line+"\n\n";
                }
            }
            Result res=Result.succeed(output);
            res.setCode(100);
            return res;
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * get folder path in which custom python and txt are stored
     */
    private void getPyPath() {
        String curPath=System.getProperty("user.dir");
        //TODO Path
        curPath=curPath.replace("magicProject", "algorithm\\");
        //curPath=curPath.replace("magicProject", "algorithm/");
        exePath=curPath;
    }

    /**
     * generate uuid
     * @param request http request
     * @param response http response
     * @param script custom script
     * @param defaultHeaders default headers for script
     * @return uuid or error
     * @throws Throwable potential exception
     */
    @RequestMapping(value = "/getuuid",method = {RequestMethod.GET, RequestMethod.POST})
    public Object invoke(HttpServletRequest request, HttpServletResponse response,
                         String script,
                         @RequestHeader(required = false) Map<String, Object> defaultHeaders) throws Throwable {
        this.code=script;

        Map<String, Object> headers = new LinkedCaseInsensitiveMap<>();
        headers.putAll(defaultHeaders);
        ApiInfo info=new ApiInfo();
        info.setScript(script);
        RequestEntity requestEntity = new RequestEntity(info, request, response, false, new HashMap<String, Object>(), new HashMap<String, Object>() );


        requestEntity.setHeaders(headers);
        List<Path> paths = new ArrayList<>(info.getPaths());
        MappingHandlerMapping.findGroups(info.getGroupId())
                .stream()
                .flatMap(it -> it.getPaths().stream())
                .filter(it -> !paths.contains(it))
                .forEach(paths::add);
        MagicScriptContext context = createMagicScriptContext("scriptName", requestEntity);

        requestEntity.setMagicScriptContext(context);
        try {
            Object wrap = requestEntity.getApiInfo().getOptionValue(Options.WRAP_REQUEST_PARAMETERS.getValue());
            if (wrap != null && StringUtils.isNotBlank(wrap.toString())) {
                context.set(wrap.toString(), requestEntity.getParameters());
            }
            String defaultDataSourceValue = requestEntity.getApiInfo().getOptionValue(Options.DEFAULT_DATA_SOURCE.getValue());
            if (defaultDataSourceValue != null) {
                context.set(Options.DEFAULT_DATA_SOURCE.getValue(), defaultDataSourceValue);
            }
            context.putMapIntoContext(requestEntity.getParameters());


            context.putMapIntoContext(requestEntity.getPathVariables());
            // 设置 cookie 变量
            context.set(VAR_NAME_COOKIE, new CookieContext(requestEntity.getRequest()));


            // 设置 header 变量
            context.set(VAR_NAME_HEADER, headers);
            // 设置 session 变量
            context.set(VAR_NAME_SESSION, new SessionContext(requestEntity.getRequest().getSession()));
            // 设置 path 变量
            context.set(VAR_NAME_PATH_VARIABLE, requestEntity.getPathVariables());

        } catch (Exception e) {
            //MyThreadLocal.remove();
            return Result.fail(e.getMessage());
        }

        RequestContext.setRequestEntity(requestEntity);


        Object res=invokeRequest(requestEntity);
        return res;
    }


    /**
     *
     * @param scriptName script name
     * @param requestEntity entity for magic script
     * @return magic script context
     */
    private MagicScriptContext createMagicScriptContext(String scriptName, RequestEntity requestEntity) {
        List<Integer> breakpoints = requestEntity.getRequestedBreakpoints();
        // 构建脚本上下文
        MagicScriptContext context;

        if (requestEntity.isRequestedFromDebug() && breakpoints.size() > 0) {
            MagicScriptDebugContext debugContext = new MagicScriptDebugContext(breakpoints);
            String sessionId = requestEntity.getRequestedSessionId();

            debugContext.setId(sessionId);
            debugContext.setCallback(variables -> {
                List<Map<String, Object>> varList = (List<Map<String, Object>>) variables.get("variables");
                varList.stream().filter(it -> it.containsKey("value")).forEach(variable -> {
                    variable.put("value", JsonUtils.toJsonStringWithoutLog(variable.get("value")));
                });
                WebSocketSessionManager.sendBySessionId(sessionId, BREAKPOINT, variables);
            });
            WebSocketSessionManager.createSession(sessionId, debugContext);
            context = debugContext;
        } else {
            context = new MagicScriptContext();
        }
        context.setScriptName(scriptName);
        return context;
    }

    /**
     * invoke magic script
     * @param requestEntity entity for magic script
     * @return result
     */
    private Object invokeRequest(RequestEntity requestEntity) {

        try {
            MagicScriptContext context = requestEntity.getMagicScriptContext();
            Object result = ScriptManager.executeScript(requestEntity.getApiInfo().getScript(), context);

            String uuid= MyThreadLocal.get();
            MyThreadLocal.remove();

            if (result!=null && uuid==null) {
                Result res=Result.succeed(result);
                res.setCode(20);
                return res;
            }

            if (uuid==null) {
                return Result.fail("Fail to get UUID");
            }

            if (result==null) {
                if (code.contains("model.run")) {
                    Result r=Result.succeed(uuid);
                    r.setMessage("Schedule "+uuid+" is running");
                    return r;
                }
                return Result.fail("Please input the write format");
            }
            else if (!(result instanceof Result)) {
                return Result.fail("Please input the write format");
            }

            else {
                Result res=(Result) result;
                if (res.getData()==null) {
                    String errMsg=res.getMessage();
                    return Result.fail(errMsg);
                }
                return res;
            }

        } catch (Throwable root) {
            return Result.fail(root.toString());
        } finally {
            RequestContext.remove();
        }
    }


}
