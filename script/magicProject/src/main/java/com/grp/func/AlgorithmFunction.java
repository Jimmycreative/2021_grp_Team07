package com.grp.func;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.grp.util.FuncVariable;
import com.grp.util.Result;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.runtime.RuntimeContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class AlgorithmFunction implements MagicModule {
    @Override
    public String getModuleName() {
        return "algorithm";
    }

    @Comment("Standardize job format")
    public JSONArray standardize(RuntimeContext context, List<ArrayList<ArrayList<Integer>>> jobs) throws Exception {
        getKeywordVal(context);
        ArrayList<Integer> testJob=jobs.get(0).get(0);
        if (testJob.size()!=4) {
            throw  new Exception("Wrong size of jobs");
        }
        JSONArray result=new JSONArray();
        for (ArrayList<ArrayList<Integer>> job:jobs) {
            JSONArray oneJob=new JSONArray();
            for (ArrayList<Integer> task:job) {
                JSONObject object=new JSONObject();
                object.put("machine_id", task.get(0));
                object.put("duration", task.get(1));
                object.put("start", task.get(2));
                object.put("end", task.get(3));
                oneJob.add(object);
            }
            result.add(oneJob);
        }
        return result;
    }

    private Object getKeywordVal(RuntimeContext context) {
        Map<String, Object> map=context.getVarMap();
        Object object=map.get("keyword");
        return object;
    }
}
