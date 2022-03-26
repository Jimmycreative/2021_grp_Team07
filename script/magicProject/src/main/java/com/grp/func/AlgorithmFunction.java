package com.grp.func;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.grp.util.FuncVariable;
import com.grp.util.Result;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.parsing.Parser;
import org.ssssssss.script.runtime.RuntimeContext;

import java.util.*;
import java.util.regex.Pattern;

@Component
public class AlgorithmFunction implements MagicModule {
    @Override
    public String getModuleName() {
        return "algorithm";
    }


    @Comment("Standardize job format")
    public JSONObject standardize(RuntimeContext context, List<ArrayList<ArrayList<Integer>>> jobs) {
        try {

            LinkedHashMap<String, Object> decisionVar=Parser.getJsonDecision();
            JSONObject realVars=getDecisionVar(decisionVar);

            String startKey;
            int startVal;
            String endKey;
            int endVal;
            boolean hasPriority=false;
            String priorityKey;
            ArrayList<Integer> priorityVal;

            if (realVars.isEmpty()) {
                startKey="start";
                startVal=0;
                endKey="end";
                endVal=0;
                priorityKey="priority";
                priorityVal=new ArrayList<>();

            }
            else {
                JSONObject startObj=realVars.getJSONObject("start");
                startKey=startObj.getString("name");
                startVal=startObj.getIntValue("value");

                JSONObject endObj=realVars.getJSONObject("end");
                endKey=endObj.getString("name");
                endVal=endObj.getIntValue("value");

                JSONObject priorityObj=realVars.getJSONObject("priority");

                if (priorityObj!=null) {
                    hasPriority=true;
                    priorityKey=priorityObj.getString("name");
                    priorityVal=(ArrayList<Integer>) priorityObj.get("value");
                }
                else {
                    priorityKey="priority";
                    priorityVal=new ArrayList<>();
                }
            }



            ArrayList<Integer> testJob=jobs.get(0).get(0);
            if (testJob.size()!=2) {
                return new JSONObject();
            }
            JSONArray jobArr=new JSONArray();
            JSONArray machineArr=new JSONArray();
            //job index
            int i=0;
            for (ArrayList<ArrayList<Integer>> job:jobs) {
                JSONArray oneJob=new JSONArray();
                //task index
                int j=0;
                for (ArrayList<Integer> task:job) {
                    //for jobs
                    JSONObject object=new JSONObject();
                    object.put("machine_id", task.get(0));
                    object.put("duration", task.get(1));
                    object.put(startKey, startVal);
                    object.put(endKey, endVal);
                    //object.put(priorityKey,priorityVal.get(i));
                    oneJob.add(object);

                    //for tasks
                    int index=findKey(machineArr,task.get(0));
                    JSONObject curMachine=new JSONObject();
                    JSONArray taskArr=new JSONArray();

                    JSONObject machineTask=new JSONObject();
                    machineTask.put(startKey, startVal);
                    machineTask.put(endKey, endVal);
                    machineTask.put("job_index",i+"_"+j);
                    int priority= hasPriority?priorityVal.get(i):-1;
                    machineTask.put(priorityKey,priority);
                    if (index==-1) {
                        taskArr.add(machineTask);
                        curMachine.put("machine_id", task.get(0));
                        curMachine.put("tasks", taskArr);
                        machineArr.add(curMachine);
                    }
                    else {
                        curMachine=machineArr.getJSONObject(index);
                        taskArr=curMachine.getJSONArray("tasks");
                        taskArr.add(machineTask);
                    }

                    j++;
                }
                jobArr.add(oneJob);
                i++;
            }
            JSONObject formatJob=new JSONObject();
            formatJob.put("jobs",jobArr);
            formatJob.put("machines", machineArr);

            formatJob.put("priority", priorityVal);
            return formatJob;
        } catch (Exception e) {
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return new JSONObject();
        }
    }

    /**
     * find whether machine already exists on the JSONArray
     * @param array where stores the info of machines
     * @param key machine_id
     * @return index or -1
     */
    private int findKey(JSONArray array, int key) {
        for (int i=0;i<array.size();i++) {
            JSONObject obj=array.getJSONObject(i);
            if (obj.get("machine_id").equals(key)) {
                return i;
            }
        }
        return -1;
    }

    private Object getJobPriority(RuntimeContext context) {
        Map<String, Object> map=context.getVarMap();
        Object object=map.get("job_priority");
        return object;
    }

    private JSONObject getDecisionVar(LinkedHashMap<String, Object> decisionVars) throws Exception {
        JSONObject realVars=new JSONObject();
        int count=0;
        try {
            for (String str: decisionVars.keySet()) {
                JSONObject oneVar=new JSONObject();
                if (count>3)
                    break;
                String key=str.replace("decision_var ", "");
                key=key.replace("=", "");
                key=key.replace(" ", "");

                String tempVal=(String) decisionVars.get(str);
                if (count<2) {
                    int initValue=Integer.parseInt(tempVal);
                    oneVar.put("name", key);
                    oneVar.put("value", initValue);

                    if (count==0) {
                        realVars.put("start", oneVar);
                    }
                    else if (count==1) {
                        realVars.put("end", oneVar);
                    }
                }
                else {
                    tempVal=tempVal.replace("[", "");
                    tempVal=tempVal.replace("]", "");
                    tempVal=tempVal.replace(" ", "");
                    String[] split = tempVal.split(","); //转为String[]

                    Integer[] ints1 = new Integer[split.length];
                    for (int i = 0; i < ints1.length; i++) {
                        ints1[i] = Integer.parseInt(split[i]);
                    }

                    ArrayList<Integer> priorityList=new ArrayList(Arrays.asList(ints1));

                    oneVar.put("name", key);
                    oneVar.put("value", priorityList);
                    realVars.put("priority",oneVar);
                }

                count++;
            }

        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
        return realVars;
    }
}
