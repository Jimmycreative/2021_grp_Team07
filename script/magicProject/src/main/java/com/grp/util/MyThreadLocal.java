package com.grp.util;

/**
 * To store uuid
 */
public class MyThreadLocal {
    private static ThreadLocal<String> threadLocal = new ThreadLocal<>();

    /**
     * set thread
     * @param uuid uuid to be stored
     */
    public static void set(String uuid) {
        threadLocal.set(uuid);
    }

    /**
     * get uuid
     * @return uuid
     */
    public static String get() {
        return threadLocal.get();
    }

    /**
     * remove thread
     */
    public static void remove() {
        threadLocal.remove();
    }
}
