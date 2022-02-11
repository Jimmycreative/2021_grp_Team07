package com.grp.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.grp.util.ServiceVariable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;

/**
 * ModelService contains the major logic for defining the JSSP
 */
@Service
public class ModelService {
    private static final String basicType="basic";
    private static final String flexibleType="flexible";
    private static final String dynamicType="dynamic";
    private static final String multiResourceType="multiresource";
    private static final String myException="Exception: ";


    /**
     * Basic Type
     * @param jobs jobs to be defined
     * @param uuid schedule uuid
     * @param objective objective function
     * @param nameMap name map for jobs and machines
     */
    @Async
    public void runBasic(List<ArrayList<ArrayList>> jobs, String uuid, String objective, HashMap<String, String> nameMap) {
        ServiceVariable serviceVariable=new ServiceVariable();
        serviceVariable.setUuid(uuid);
        serviceVariable.setType(basicType);
        initialize(objective, nameMap, serviceVariable);

        readCode(changeNestedArrForm(jobs, serviceVariable), "", basicType, serviceVariable);
    }

    /**
     * Flexible Type
     * @param jobs jobs to be defined
     * @param uuid schedule uuid
     * @param objective objective function
     * @param nameMap name map for jobs and machines
     */
    @Async
    public void runFlexible(List<ArrayList<ArrayList>> jobs, String uuid, String objective, HashMap<String, String> nameMap) {
        ServiceVariable serviceVariable=new ServiceVariable();
        serviceVariable.setUuid(uuid);
        serviceVariable.setType(flexibleType);
        initialize(objective, nameMap, serviceVariable);

        readCode(changeNestedArrForm(jobs, serviceVariable), "", multiResourceType, serviceVariable);
    }

    /**
     * Dynamic Type
     * @param jobs jobs to be defined
     * @param expected_duration expected duration
     * @param uuid schedule uuid
     * @param objective objective function
     * @param nameMap name map for jobs and machines
     */
    @Async
    public void runDynamic(List<ArrayList<ArrayList>> jobs, List<Integer> expected_duration, String uuid, String objective, HashMap<String, String> nameMap) {
        ServiceVariable serviceVariable=new ServiceVariable();
        serviceVariable.setUuid(uuid);
        serviceVariable.setType(dynamicType);
        initialize(objective, nameMap, serviceVariable);

        //for dynamic type
        String pyDurations= changeArrForm(expected_duration);

        readCode(changeNestedArrForm(jobs, serviceVariable), pyDurations, dynamicType, serviceVariable);
    }


    /**
     * Multi resource Type
     * @param jobs jobs to be defined
     * @param uuid schedule uuid
     * @param objective objective function
     * @param nameMap name map for jobs and machines
     */
    @Async
    public void runMulti(List<ArrayList<ArrayList>> jobs, String uuid, String objective, HashMap<String, String> nameMap) {
        ServiceVariable serviceVariable=new ServiceVariable();
        serviceVariable.setUuid(uuid);
        serviceVariable.setType(multiResourceType);
        initialize(objective, nameMap, serviceVariable);

        readCode(changeNestedArrForm(jobs, serviceVariable), "", multiResourceType, serviceVariable);
    }

    /**
     * initialize serviceVariable
     * @param objective objective function
     * @param nameMap name map for jobs and machines
     * @param serviceVariable to store variables
     */
    private void initialize(String objective, HashMap<String, String> nameMap, ServiceVariable serviceVariable) {
        serviceVariable.setObjective(objective);
        serviceVariable.setNameMap(nameMap);
        getPyPath(serviceVariable);
    }


    /**
     * standardize string format
     * @param jobs job list
     * @param serviceVariable to store variables
     * @return standardized string
     */
    private String changeNestedArrForm(List<ArrayList<ArrayList>> jobs, ServiceVariable serviceVariable) {
        String pyJobs=jobs.toString();
        if (serviceVariable.getType().equals(multiResourceType)) {
            pyJobs=handleBracket(jobs);
        }
        else {
            pyJobs= midToSmall(pyJobs);
        }
        //delete the out most brackets
        pyJobs=pyJobs.substring(1,pyJobs.length()-1);

        return pyJobs;
    }

    /**
     * standardize string format
     * @param jobs job list
     * @return standardized string
     */
    private String handleBracket(List<ArrayList<ArrayList>> jobs) {
        String output="";
        for (int i=0;i< jobs.size();i++) {
            String tempStr="";
            for (int j=0;j< jobs.get(i).size();j++) {
                Object temp=jobs.get(i).get(j);
                Object subTemp=jobs.get(i).get(j).get(0);
                if (subTemp instanceof List) {
                    String temp1=temp.toString();
                    temp1= midToSmall(temp1);
                    temp1=j==jobs.get(i).size()-1?temp1:temp1+", ";
                    tempStr+=temp1;
                }
                else {
                    String temp2 = temp.toString().replace("[", "(");
                    temp2=temp2.replace("]", ")");
                    temp2="["+temp2+"]";
                    temp2=j==jobs.get(i).size()-1?temp2:temp2+", ";
                    tempStr+=temp2;
                }
            }
            tempStr="["+tempStr+"]";
            tempStr=i==jobs.size()-1?tempStr:tempStr+", ";
            output+=tempStr;
        }
        return output;
    }

    /**
     * change bracket
     * @param str string
     * @return standardized string
     */
    private String midToSmall(String str) {
        for (int i=1;i<str.length()-1;i++) {
            if (Character.isDigit(str.charAt(i+1))) {
                str=str.substring(0,i)+str.substring(i,i+1).replace("[","(")+str.substring(i+1);
            }
            else if (Character.isDigit(str.charAt(i-1))) {
                str=str.substring(0,i)+str.substring(i,i+1).replace("]",")")+str.substring(i+1);
            }
        }
        return str;
    }


    /**
     * standardize string format
     * @param expected_duration expected duration for jobs
     * @return standardized string
     */
    private String changeArrForm(List expected_duration) {
        String duration=expected_duration.toString();
        duration=duration.replace("[","");
        duration=duration.replace("]","");
        return duration;
    }

//    private String changeDictForm(LinkedHashMap machine_count) {
//        String m_count=machine_count.toString();
//        m_count=m_count.replace("=",":");
//        m_count=m_count.replace("{","");
//        m_count=m_count.replace("}","");
//        return m_count;
//    }

    /**
     * get python model path
     * @param serviceVariable to store variables
     */
    private void getPyPath(ServiceVariable serviceVariable) {
        String curPath=System.getProperty("user.dir");
        //TODO
        curPath=curPath.replace("magicProject", "algorithm\\");
        serviceVariable.setPath(curPath+"pymodel\\");
        serviceVariable.setExePath(curPath);
    }

    /**
     * read the original template file
     * @param jobs variable to replace in the template
     */
    private void readCode(String jobs, String modifiedContent, String modelType, ServiceVariable serviceVariable) {
        String myPath= serviceVariable.getPath()+modelType+".py";
        String line;
        StringBuffer buf = new StringBuffer();
        BufferedReader reader=null;

        try {
            File file=new File(myPath);
            InputStream input = new FileInputStream(file);

            InputStreamReader inputStreamReader = new InputStreamReader(input);
            reader=new BufferedReader(inputStreamReader);


            while ((line = reader.readLine()) != null) {
                //define the jobs
                if (line.contains("#define the jobs")) {
                    buf.append(jobs);
                }

                //define the durations
                else if (line.contains("#define the durations")) {
                    buf.append(modifiedContent);
                }

                //define the machine type
                else if (line.contains("#define the machine type")) {
                    buf.append(modifiedContent);
                }

                else {
                    buf.append(line+"\n");
                }
            }
        }
        catch (Exception e) {
            writeFile(myException+e.getMessage(), serviceVariable);
        }
        finally {
            if (reader != null) {
                try {
                    reader.close();
                } catch (IOException e) {
                    writeFile(myException+e.getMessage(), serviceVariable);
                }
            }
        }

        try {
            createPy(buf.toString(), serviceVariable);
        } catch (Exception e) {
            writeFile(myException+e.getMessage(), serviceVariable);
        }


    }


    /**
     * Create runtime python file
     * @param content code to be executed
     */
    private void createPy(String content, ServiceVariable serviceVariable) throws Exception {
        String fileName= serviceVariable.getExePath()+serviceVariable.getUuid()+".py";
        File file=new File(fileName);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }

            writeCode(fileName, content, serviceVariable);
        }
        catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    /**
     * write code to the runtime python file
     * @param filePath where the file is stored
     * @param content code to be executed
     */
    private void writeCode(String filePath, String content, ServiceVariable serviceVariable) throws Exception {
        BufferedWriter bw = null;

        try {
            bw = new BufferedWriter(new FileWriter(filePath));
            bw.write(content);
        } catch (Exception e) {
           throw new Exception(e.getMessage());
        } finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    throw new IOException(e.getMessage());
                }
            }
        }

        try {
            executeCode(serviceVariable);
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    /**
     * write result to txt
     * @param content result
     * @param serviceVariable where stores the variables
     */
    private void writeFile(String content, ServiceVariable serviceVariable) {
        BufferedWriter bw = null;
        String fileName=serviceVariable.getExePath()+serviceVariable.getUuid()+".txt";
        File file=new File(fileName);
        try {
            if (!file.exists()) {
                file.createNewFile();
            }
            bw = new BufferedWriter(new OutputStreamWriter(
                    new FileOutputStream(file, true)));
            bw.write(content);
        }
        catch (Exception e) {
            //writeFile(myException+e.getMessage());
            System.out.println(e.getMessage());
        } finally {
            if (bw != null) {
                try {
                    bw.close();
                } catch (IOException e) {
                    System.out.println(e.getMessage());
                }
            }
        }
    }

    /**
     * execute algorithm in python
     * @param serviceVariable where stores the variables
     * @throws Exception potential exception
     */
    private void executeCode(ServiceVariable serviceVariable) throws Exception {
        int flag=0;
        try {
            String pyFile="python "+serviceVariable.getExePath()+serviceVariable.getUuid()+".py";
            Process proc = Runtime.getRuntime().exec(pyFile);// 执行py文件

            BufferedReader in = new BufferedReader(new InputStreamReader(proc.getInputStream()));
            String line;
            while ((line = in.readLine()) != null) {
                //Thread.sleep(10000);
                if (!line.equals("")) {
                    flag=1;
                    if (line.contains("Machine")) {
                        line=line.replace("-","");
                        line=standardize(line, serviceVariable);
                    }
                    writeFile(line+"\n", serviceVariable);
                }
            }
            in.close();
            proc.waitFor();
            if (flag==0) {
                String ex=myException+"Parameters error";
                writeFile(ex, serviceVariable);
            }
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }

    }

    /**
     * standardize format generated from python
     * @param line
     * @param serviceVariable where stores the variables
     * @return standardized string
     * @throws Exception potential exception
     */
    private String standardize(String line, ServiceVariable serviceVariable) throws Exception {
        line=line.replace("False","false");
        JSONObject originalObj=parseObject(line);

        try {
            HashMap<String, String> nameMap=serviceVariable.getNameMap();
            JSONArray originalResult=originalObj.getJSONArray("result");
            int machineCount=0;

            for (int i=0;i< originalResult.size();i++) {
                JSONObject originalTask=originalResult.getJSONObject(i);
                String originalName=(String) originalTask.get("id");
                //object is machine
                if (originalTask.get("type").equals("project")) {
                    String machineName=originalName.split(" ")[0];
                    machineName=machineName+" "+machineCount;
                    String name=nameMap.get(machineName);
                    machineCount++;
                    originalTask.put("name",name);
                }

                else {
                    String jobName=originalName.split("\\|")[0];
                    String showName=nameMap.get(jobName);
                    //task name
                    if (originalTask.get("type").equals("task")) {
                        String taskName=originalName.split("\\|")[1];
                        String name=showName+" "+taskName;
                        originalTask.put("name",name);
                    }
                }
            }

        } catch (Exception e) {
            throw new Exception();
        }
        return originalObj.toString().replace("\"","'");
    }


    /**
     * parse json
     * @param output string format of output
     * @return json converted from string
     */
    private JSONObject parseObject(String output) {
        JSONObject jsonObject = JSONObject.parseObject(output);
        System.out.println(jsonObject);
        return jsonObject;
    }

}
