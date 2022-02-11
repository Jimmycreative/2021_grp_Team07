package com.grp.util;

import lombok.Data;

/**
 * structure to store the result
 */
@Data
public class Result {
    int code=0;
    Object data="";
    String message="";
    static int success=1;
    static int failure=-1;

    /**
     * when the result is right
     * @param data main data
     * @return result
     */
    public static Result succeed(Object data) {
        Result result=new Result();
        result.setData(data);
        result.setCode(success);
        result.setMessage("success");
        return result;
    }

    /**
     * when error occurs
     * @param msg error message
     * @return result
     */
    public static Result fail(String msg) {
        Result result=new Result();
        result.setData(null);
        result.setCode(failure);
        result.setMessage(msg);
        return result;
    }
}
