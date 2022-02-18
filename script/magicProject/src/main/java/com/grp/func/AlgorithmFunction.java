package com.grp.func;

import com.grp.util.FuncVariable;
import com.grp.util.Result;
import org.springframework.stereotype.Component;
import org.ssssssss.magicapi.config.MagicModule;
import org.ssssssss.script.annotation.Comment;
import org.ssssssss.script.runtime.RuntimeContext;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@Component
public class AlgorithmFunction implements MagicModule {
    @Override
    public String getModuleName() {
        return "algorithm";
    }

    @Comment("Sum up")
    public int sum(Integer... params) throws Exception {
        int sum=0;
        try {
            for (int i : params) {
                sum+=i;
            }
        }
        catch (Exception e) {
            throw new Exception("Wrong input");
        }
        System.out.println(sum);
        return sum;
    }

    @Comment("Sum up")
    public int basicConstraint(String... params) throws Exception {
        int sum=0;
        try {
            for (String i : params) {
                System.out.println(i);
            }
        }
        catch (Exception e) {
            throw new Exception("Wrong input");
        }
        System.out.println(sum);
        return sum;
    }
}
