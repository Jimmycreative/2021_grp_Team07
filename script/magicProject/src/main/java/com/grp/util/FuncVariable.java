package com.grp.util;

import lombok.Data;
import org.ssssssss.script.MagicScriptContext;
import org.ssssssss.script.runtime.RuntimeContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * class to store variables in ModelFunction because of singleton
 */
@Data
public class FuncVariable {
    private RuntimeContext runtimeContext;
    private int jobsLen=-1;
    private int machineLen=-1;
    String uuid="";
    List<ArrayList<ArrayList>> jobs=new ArrayList();
    ArrayList<String> machineNameList=new ArrayList<>();

    private String objective1="minimize";
    private String objective2="maximize";
    private String jobNames="job_names";
    private String machineNames="machine_names";
    private String basicConstraint="basicConstraint";

    String objective="";
    HashMap<String, String> nameMap=new HashMap<>();


}
