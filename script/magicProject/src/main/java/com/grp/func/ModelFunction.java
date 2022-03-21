package com.grp.func;



import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.grp.service.ModelService;
import com.grp.util.FuncVariable;
import com.grp.util.MyThreadLocal;
import com.grp.util.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.parsing.Parser;
import org.ssssssss.script.reflection.JavaReflection;
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

    @Comment("run model")
    public void add(String test) {
        System.out.println(test);
    }

    @Comment("run model")
    public Result runModel(RuntimeContext context, @Comment("job_type") int type, @Comment("js_jobs") @Nullable JSONObject originalData) {
        if (originalData==null) {
            if (type<3) {
                return Result.fail("Wrong Definition.");
            }
        }
        else if (type<1 || (originalData.isEmpty() && type<3) || type>4) {
            return Result.fail("Wrong Definition.");
        }
        try {
            Result originalRes=Result.succeed(originalData);
            if (type==3 || type==4) {
                List<ArrayList<ArrayList>> jobs=getJobKeyword(context);
                Result res=type==3?runFlexible(context, jobs, type):runMulti(context, jobs, type);
                return res;
            }
            JSONObject myData = (JSONObject) originalRes.getData();
            JSONArray jobArr = myData.getJSONArray("jobs");
            JSONArray machineArr = myData.getJSONArray("machines");

            List<ArrayList<ArrayList>> realJobs=JSToList(jobArr);
            if (type==1) {
                return runBasic(context, realJobs, type);
            }
            else if (type==2) {
                ArrayList<Integer> priorityArr =(ArrayList<Integer>) myData.get("priority");
                return runDynamic(context, realJobs, priorityArr, type);
            }
            else {
                return Result.fail("Wrong type");
            }


        } catch (Exception e) {
            return Result.fail(e.getMessage());
        }
    }

    /**
     * get original format of jobs
     * @param context runtime context
     * @return all jobs
     * @throws Exception potential exception
     */
    private List<ArrayList<ArrayList>> getJobKeyword(RuntimeContext context) throws Exception {
        try {
            Map<String, Object> map=context.getVarMap();
            List<ArrayList<ArrayList>> list=(List<ArrayList<ArrayList>>) map.get("jobs");
            return list;
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    /**
     * Convert format of jobs
     * @param jobArr JSONArray for jobs
     * @return Arraylist of jobs
     */
    private List<ArrayList<ArrayList>> JSToList(JSONArray jobArr) {
        List<ArrayList<ArrayList>> jobs=new ArrayList<>();
        for (int i=0;i<jobArr.size();i++) {
            ArrayList<ArrayList> myJob=new ArrayList<>();
            JSONArray oneJob=jobArr.getJSONArray(i);
            for (int j=0;j<oneJob.size();j++) {
                ArrayList myTask=new ArrayList<>();
                JSONObject oneTask=oneJob.getJSONObject(j);
                int machine_id=oneTask.getIntValue("machine_id");
                int duration=oneTask.getIntValue("duration");
                myTask.add(machine_id);
                myTask.add(duration);
                myJob.add(myTask);
            }
            jobs.add(myJob);
        }
        return jobs;
    }

    /**
     * Basic Type
     * @param context in magic script
     * @param jobs job list
     * @return result which contains uuid or error
     */
    @Comment("run basic model")
    public Result runBasic(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs, int type) {
        FuncVariable funcVariable=new FuncVariable();

        funcVariable.setType(type);

        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            ArrayList<String> myConstraints=funcVariable.getMyConstraints();
            modelService.runBasic(jobs, uuid, objective, nameMap, myConstraints, type);
            System.out.println(getUUid(funcVariable));
            //
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return getUUid(funcVariable);
        } catch (Exception e) {
            Parser.clearDecisions();
            Parser.clearJsonDecision();
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
    public Result runFlexible(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs, int type) {
        FuncVariable funcVariable=new FuncVariable();

        funcVariable.setType(type);
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runFlexible(jobs, uuid, objective, nameMap,type);
            System.out.println(getUUid(funcVariable));
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return getUUid(funcVariable);
        } catch (Exception e) {
            Parser.clearDecisions();
            Parser.clearJsonDecision();
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
    public Result runDynamic(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs, @Comment("expected duration")List<Integer> expected_duration,int type) throws Exception {
        FuncVariable funcVariable=new FuncVariable();
        funcVariable.setType(type);
        if (expected_duration==null) {
            throw new Exception("Please define expected duration for each job");
        }
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runDynamic(jobs, expected_duration, uuid, objective, nameMap,type);
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return getUUid(funcVariable);
        } catch (Exception e) {
            Parser.clearDecisions();
            Parser.clearJsonDecision();
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
    public Result runMulti(RuntimeContext context, @Comment("jobs")List<ArrayList<ArrayList>> jobs,int type) {
        FuncVariable funcVariable=new FuncVariable();
        funcVariable.setType(type);
        try {
            funcVariable.setRuntimeContext(context);
            initialize(jobs, funcVariable);
            getAdditionalVal(funcVariable);

            String uuid=funcVariable.getUuid();
            String objective=funcVariable.getObjective();
            HashMap<String, String> nameMap= funcVariable.getNameMap();
            modelService.runMulti(jobs, uuid, objective, nameMap,type);
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return getUUid(funcVariable);
        } catch (Exception e) {
            Parser.clearDecisions();
            Parser.clearJsonDecision();
            return Result.fail(e.getMessage());
        }
    }

    //ToDo
    // define the script without template



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
            //get basic constraints
            String basicConstraint=getKeywordVal(funcVariable.getBasicConstraint(), funcVariable)==null?"":(String) getKeywordVal(funcVariable.getBasicConstraint(), funcVariable);
            if (!basicConstraint.equals("")) {
                //parseConstraint(basicConstraint);
            }
            //ArrayList<String> myConstraint=parseConstraint(basicConstraint);
            //TODO
            //whether subject_to is valid

            funcVariable.setMyConstraints(Parser.getSubjectConstraints());
            //String customizedConstraint=getKeywordVal(funcVariable.getCustomizedConstraint(), funcVariable)==null?"":(String) getKeywordVal(funcVariable.getCustomizedConstraint(), funcVariable);

            //analyzeConstraint(customizedConstraint, funcVariable);

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

    private void analyzeConstraint(String customizedConstraint, FuncVariable funcVariable) throws Exception {
        if (customizedConstraint.equals(""))
            return;
        try {
            customizedConstraint=customizedConstraint.replace("\n", "");
            ArrayList<String> myConstraints=new ArrayList<>();
            String [] constraints=customizedConstraint.split(";");
            for (String constraint:constraints) {
                //find the job name
                //e.g. 2job1.task[0].start
                StringBuilder expr= new StringBuilder();
                expr.append("    model.Add(");
                if (!constraint.contains(".start") && !constraint.contains(".end")) {
                    throw new Exception("Please input correct constraint format");
                }
                constraint=constraint.replace(" ","");
                constraint=constraint.replace("-","+(-1)");
                if (constraint.contains("+")) {
                    String [] exprConstraints=constraint.split("\\+");
                    for (String exprConstraint:exprConstraints) {
                        if (exprConstraint.contains("<") || exprConstraint.contains(">") || exprConstraint.contains("=")) {
                            getExpression(expr, exprConstraint, funcVariable);
                        } else {
                            expr.append(getVariable(exprConstraint, funcVariable) + "+");
                        }
                    }
                }
                else {
                    getExpression(expr,constraint,funcVariable);
                }
                expr.append(")");
                myConstraints.add(expr.toString());

            }
            funcVariable.setMyConstraints(myConstraints);
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private String getVariable(String constraint, FuncVariable funcVariable) throws Exception {
        try {
            String jobName=constraint.substring(0, constraint.indexOf("."));
            //e.g. job1
            int jobIndex=Integer.parseInt(jobName.substring(jobName.length()-1));
            if (jobIndex>=funcVariable.getJobsLen() || jobIndex<0) {
                throw new Exception("wrong job index");
            }
            //e.g. 2job1
            //TODO if negative
            int coefficient;
            //String coefficientStr;
            coefficient=!Character.isDigit(jobName.charAt(0))?1:Integer.parseInt(jobName.substring(0,1));

            String realConstraint;
            if (constraint.contains("task[")) {
                String task=constraint.substring(constraint.indexOf("[")+1, constraint.indexOf("]"));
                int taskIndex=Integer.parseInt(task);
                realConstraint=coefficient+"*all_tasks["+(jobIndex-1)+", "+taskIndex+"]"+constraint.substring(constraint.indexOf("]")+1);
            }
            else {
                //e.g. job2.start
                String expression=constraint.substring(constraint.indexOf("."));
                if (expression.contains("start")) {
                    realConstraint=coefficient+"*all_tasks["+(jobIndex-1)+", "+0+"].start";
                }
                else if (expression.contains("end")){
                    List<ArrayList<ArrayList>> jobs=funcVariable.getJobs();
                    int len=jobs.get(jobIndex).size()-1;
                    realConstraint=coefficient+"*all_tasks["+(jobIndex-1)+", "+len+"].end";
                }
                else {
                    throw new Exception("Wrong format");
                }

            }
            return realConstraint;
        }catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    private String getExpression(StringBuilder expr, String exprConstraint, FuncVariable funcVariable) throws Exception {
        if (exprConstraint.contains(">")) {
            String[] finalExprs=exprConstraint.split(">");
            expr.append(getVariable(finalExprs[0], funcVariable));
            expr.append(">").append(finalExprs[1]);
        }
        else if (exprConstraint.contains("<")) {
            String[] finalExprs=exprConstraint.split("<");
            expr.append(getVariable(finalExprs[0], funcVariable));
            expr.append("<").append(finalExprs[1]);
        }

        else if (exprConstraint.contains("=")) {
            String[] finalExprs=exprConstraint.split("=");
            expr.append(getVariable(finalExprs[0], funcVariable));
            expr.append("=").append(finalExprs[1]);
        }
        return expr.toString();
    }


    public String handleParse(String inputConstraint){

        String handle = inputConstraint;

        for (int i=0;i<handle.length();i++){
            if (handle.charAt(i)=='/' && handle.charAt(i+1)=='/'){
                int start = i;
                while(handle.charAt(i)!='\n'){
                    //System.out.println(i);
                    //System.out.println(handle.charAt(i));
                    i = i+1;
                }
                int end = i;
                handle = handle.replace(handle.substring(start,end),"");

                i = start;
            }
        }
        System.out.println(handle);
        return handle;
    }


}
