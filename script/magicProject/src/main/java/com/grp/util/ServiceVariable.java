package com.grp.util;

import lombok.Data;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * class to store variables in ServiceVariable because of singleton
 */
@Data
public class ServiceVariable {

    private String type="";
    /**
     * Where the templates are
     */
    private String path="";
    /**
     * Where user python files are generated
     */
    private String exePath="";


    private String uuid="";
    private String pyJobs="";
    private ArrayList<String> myConstraints=new ArrayList<>();
    String objective;
    HashMap<String, String> nameMap;
}
