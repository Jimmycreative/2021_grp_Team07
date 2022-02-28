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
    public JSONObject standardize(RuntimeContext context, List<ArrayList<ArrayList<Integer>>> jobs) throws Exception {
        getKeywordVal(context);
        ArrayList<Integer> testJob=jobs.get(0).get(0);
        if (testJob.size()!=4) {
            throw  new Exception("Wrong size of jobs");
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
                object.put("start", task.get(2));
                object.put("end", task.get(3));
                oneJob.add(object);

                //for tasks
                int index=findKey(machineArr,task.get(0));
                JSONObject curMachine=new JSONObject();
                JSONArray taskArr=new JSONArray();

                JSONObject machineTask=new JSONObject();
                machineTask.put("start", 0);
                machineTask.put("end", 0);
                machineTask.put("job_index",i+"_"+j);
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
        return formatJob;
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

    private Object getKeywordVal(RuntimeContext context) {
        Map<String, Object> map=context.getVarMap();
        Object object=map.get("keyword");
        return object;
    }
}
