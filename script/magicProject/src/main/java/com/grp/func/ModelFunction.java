package com.grp.func;



import com.grp.service.ModelService;
import com.grp.util.FuncVariable;
import com.grp.util.MyThreadLocal;
import com.grp.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.runtime.RuntimeContext;

import java.util.*;

/**
 * ModelFunction contains the main function user can use in the script language
 */
@Component
public class ModelFunction implements MagicModule {
    private static final String defaultObjective="util.minimizeMakespan(model, horizon, all_tasks, jobs_data)";
    @Autowired
    private ModelService modelService;
    private static final String basicType="basic";
    private static final String flexibleType="flexible";
    private static final String dynamicType="dynamic";
    private static final String multiResourceType="multiresource";

    @Override
    public String getModuleName() {
        return "model";
    }

    /**
     * Basic Type
     * @param context in magic script
     * @param jobs job list
     * @return result which contains uuid or error
     */
    @Comment("run basic model")
    public Result runBasic(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs) {
        FuncVariable funcVariable=new FuncVariable();
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runBasic(jobs, uuid, objective, nameMap);
            System.out.println(getUUid(funcVariable));
            return getUUid(funcVariable);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * Flexible Type
     * @param context in magic script
     * @param jobs job list
     * @return result which contains uuid or error
     */
    @Comment("run flexible model")
    public Result runFlexible(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs) {
        FuncVariable funcVariable=new FuncVariable();
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runFlexible(jobs, uuid, objective, nameMap);
            System.out.println(getUUid(funcVariable));
            return getUUid(funcVariable);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * Dynamic Type
     * @param context in magic script
     * @param jobs job list
     * @param expected_duration for each job
     * @return result which contains uuid or error
     */
    @Comment("run dynamic model")
    public Result runDynamic(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs, @Comment("expected duration")List<Integer> expected_duration) {
        FuncVariable funcVariable=new FuncVariable();
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runDynamic(jobs, expected_duration, uuid, objective, nameMap);
            return getUUid(funcVariable);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * Multi Type
     * @param context in magic script
     * @param jobs job list
     * @return result which contains uuid or error
     */
    @Comment("run multi resource model")
    public Result runMulti(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs) {
        FuncVariable funcVariable=new FuncVariable();
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runMulti(jobs, uuid, objective, nameMap);
            return getUUid(funcVariable);
        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * to get uuid
     * @param funcVariable to store variables
     * @return result
     */
    private Result getUUid(FuncVariable funcVariable) {
        String uuid=funcVariable.getUuid();
        Result temp=Result.succeed(uuid);
        temp.setMessage("Schedule "+uuid+" is running");
        return temp;
    }

    /**
     * initialize necessary variables
     * @param jobs jobs to be defined
     * @param funcVariable to store variables
     */
    private void initialize(List<ArrayList<ArrayList>> jobs, FuncVariable funcVariable) {
        funcVariable.setUuid(UUID.randomUUID().toString().replaceAll("-",""));
        funcVariable.setJobs(jobs);
        funcVariable.setJobsLen(jobs.size());
        getMachineLen(funcVariable);
        MyThreadLocal.set(funcVariable.getUuid());
    }

    /**
     * get machine list
     * @param funcVariable to store variables
     */
    private void getMachineLen(FuncVariable funcVariable) {
        HashMap<Integer, Integer> map=new HashMap<>();
        ArrayList<String> nameList=new ArrayList<>();
        List<ArrayList<ArrayList>> jobs=funcVariable.getJobs();
        int jobLen=funcVariable.getJobsLen();
        for (int i=0;i<jobLen;i++) {
            for (int j=0;j< jobs.get(i).size();j++) {
                Object temp=jobs.get(i).get(j).get(0);
                if (temp instanceof List) {
                    for (int x=0;x<jobs.get(i).get(j).size();x++) {
                        List tempList=(List) jobs.get(i).get(j).get(x);
                        setMap(tempList.get(0),map);
                    }
                }
                else {
                    setMap(temp, map);
                }
            }
        }
        //set machine default names
        for(int key : map.keySet()){
            nameList.add("Maachine "+key);
        }
        funcVariable.setMachineLen(map.size());
        funcVariable.setMachineNameList(nameList);
    }

    /**
     * set index map
     * @param temp index
     * @param map index map
     */
    private void setMap(Object temp, HashMap<Integer, Integer> map) {
        int index=(int) temp;
        if (!map.containsKey(index)) {
            map.put(index, 1);
        }
        else {
            map.put(index, map.get(index)+1);
        }
    }

    /**
     * to detect whether there is additional custom variables (objective / job names / machine names)
     * @param funcVariable to store variables
     * @throws Exception potential exception
     */
    private void getAdditionalVal(FuncVariable funcVariable) throws Exception {
        try {
            String objective=getKeywordVal(funcVariable.getObjective1(), funcVariable)==null?defaultObjective:(String) getKeywordVal(funcVariable.getObjective1(), funcVariable);
            funcVariable.setObjective(objective);
            ArrayList<String> job_names=getKeywordVal(funcVariable.getJobNames(), funcVariable)==null?getDefaultNames("job", funcVariable.getJobsLen()):(ArrayList<String>) getKeywordVal(funcVariable.getJobNames(), funcVariable);
            ArrayList<String> machine_names=getKeywordVal(funcVariable.getMachineNames(), funcVariable)==null?funcVariable.getMachineNameList():(ArrayList<String>) getKeywordVal(funcVariable.getMachineNames(), funcVariable);

            assert machine_names != null;
            if (machine_names.size()!= funcVariable.getMachineLen()) {
                throw new Exception("You need to define machine names for all machines");
            }

            assert job_names != null;
            if (job_names.size()!= funcVariable.getJobsLen()) {
                throw new Exception("You need to define job names for all jobs");
            }

            setHash("job_",job_names, funcVariable);
            setHash("Machine ", machine_names, funcVariable);
        } catch (ClassCastException e) {
            throw new ClassCastException("Please write in right format");
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    /**
     * set name map for jobs and machines
     * @param prefix is either job or machine
     * @param list get custom name
     * @param funcVariable to store variables
     */
    private void setHash(String prefix, ArrayList<String> list, FuncVariable funcVariable) {
        HashMap<String, String> nameMap=funcVariable.getNameMap()==null?new HashMap<>():funcVariable.getNameMap();
        for (int i=0;i<list.size();i++) {
            nameMap.put(prefix+i, list.get(i));
        }
        funcVariable.setNameMap(nameMap);
    }

    /**
     * get default names
     * @param prefix is either job or machine
     * @param length number of jobs or machines
     * @return
     */
    private ArrayList<String> getDefaultNames(String prefix, int length) {
        ArrayList<String> nameList=new ArrayList<>();
        for (int i=0;i<length;i++) {
            nameList.add(prefix+"_"+i);
        }
        return nameList;
    }

    /**
     * get keyword if there is additional variable
     * @param keyword for additional variable
     * @param funcVariable to store variables
     * @return value for the variable
     */
    private Object getKeywordVal(String keyword, FuncVariable funcVariable) {
        RuntimeContext runtimeContext=funcVariable.getRuntimeContext();
        Map<String, Object> map=runtimeContext.getVarMap();
        Object object=map.get(keyword);
        return object;

    }



}
