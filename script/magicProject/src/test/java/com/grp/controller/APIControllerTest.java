package com.grp.controller;

import com.alibaba.fastjson.JSONObject;
import com.grp.UtilApplication;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;



/**
 * Test two apis in script language
 */
@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes = {UtilApplication.class})
@WebAppConfiguration
class APIControllerTest {
    private MockMvc mockMvc;

    private final String scriptName ="script";
    private final String uuidName ="uuid";
    private final String idApi="/home/getuuid";
    private final String resApi="/home/getres";

    private String normalScript="//task=[machine_id, duration]\n" +
            "job1=[[0, 3], [1, 2], [2, 2]]\n" +
            "job2=[[0, 2], [2, 1], [1, 4]]\n" +
            "job3=[[1, 4], [2, 3]]\n" +
            "jobs=[job1,job2,job3]\n" +
            "\n" +
            "//optional\n" +
            "job_names=[\"job_1\",\"job_2\", \"job_3\"]\n" +
            "//optional\n" +
            "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
            "\n" +
            "//remember to return\n" +
            "return model.runBasic(jobs)";
    @Autowired
    private WebApplicationContext wac;

    /**
     * set up environment
     */
    @BeforeEach
    public void setup() {
        this.mockMvc = MockMvcBuilders.webAppContextSetup(this.wac).build();
    }

    JSONObject getTestRes(String param, String api, String argName) throws Exception {
        String responseString = mockMvc.perform(post(api)
                        .accept(MediaType.APPLICATION_JSON).param(argName, param))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();
        JSONObject jsonObject = JSONObject.parseObject(responseString);
        return jsonObject;
    }

    /**
     * getUUID api
     * normal input
     * @throws Exception mvc exception
     */
    @Test
    void getNormalUUID1() throws Exception {
        JSONObject jsonObject= getTestRes(normalScript, idApi, scriptName);
        System.out.println("result: " + jsonObject);
        Assertions.assertEquals(1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * normal input without return
     * @throws Exception mvc exception
     */
    @Test
    void getNormalUUID2() throws Exception {
        JSONObject jsonObject= getTestRes(normalScript, idApi, scriptName);
        System.out.println("result: " + jsonObject);
        Assertions.assertEquals(1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * normal input with extra field
     * @throws Exception mvc exception
     */
    @Test
    void getNormalUUID3() throws Exception {
        String script="//task=[machine_id, duration]\n" +
                "job1=[[0, 3], [1, 2], [2, 2]]\n" +
                "job2=[[0, 2, 0], [2, 1], [1, 4]]\n" +
                "job3=[[1, 4], [2, 3]]\n" +
                "jobs=[job1,job2,job3]\n" +
                "//optional\n" +
                "job_names=[\"job_1\",\"job_2\", \"job_3\"]\n" +
                "//optional\n" +
                "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
                "//remember to return\n" +
                "model.runBasic(jobs)";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * input with wrong format, but it is detected in the algorithm part
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID4() throws Exception {
        String script="//task=[machine_id, duration]\n" +
                "job1=[[0, 3], [1, 2], [2, 2]]\n" +
                "job2=[[0, 2, x], [2, 1], [1, 4]]\n" +
                "job3=[[1, 4], [2, 3]]\n" +
                "jobs=[job1,job2,job3]\n" +
                "//optional\n" +
                "job_names=[\"job_1\",\"job_2\", \"job_3\"]\n" +
                "//optional\n" +
                "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
                "//remember to return\n" +
                "model.runBasic(jobs)";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * input without code for generating uuid
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID1() throws Exception {
        String script="ssss";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * wrong input for script language
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID2() throws Exception {
        String script="return";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * error occurs when defining JSSP
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID3() throws Exception {
        String script="//task=[machine_id, duration]\n" +
                "job1=[[0, 3], [1, 2], [2, 2]]\n" +
                "job2=[[0, 2], [2, 1], [1, 4]]\n" +
                "job3=[[1, 4], [2, 3]]\n" +
                "jobs=[job1,job2,job3]\n" +
                "return\n" +
                "//optional\n" +
                "job_names=[\"job_1\",\"job_2\", \"job_3\"]\n" +
                "//optional\n" +
                "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
                "//remember to return\n" +
                "return model.runBasic(jobs)";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }


    /**
     * getUUID api
     * lack part of job names
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID5() throws Exception {
        String script="//task=[machine_id, duration]\n" +
                "job1=[[0, 3], [1, 2], [2, 2]]\n" +
                "job2=[[0, 2], [2, 1], [1, 4]]\n" +
                "job3=[[1, 4], [2, 3]]\n" +
                "jobs=[job1,job2,job3]\n" +
                "//optional\n" +
                "job_names=[\"job_1\",\"job_2\"]\n" +
                "//optional\n" +
                "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
                "//remember to return\n" +
                "return model.runBasic(jobs)";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }

    /**
     * getUUID api
     * lack machine names
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalUUID6() throws Exception {
        String script="//task=[machine_id, duration]\n" +
                "job1=[[0, 3], [1, 2], [2, 2]]\n" +
                "job2=[[0, 2], [2, 1], [1, 4]]\n" +
                "job3=[[1, 4], [2, 3]]\n" +
                "jobs=[job1,job2,job3]\n" +
                "//optional\n" +
                "job_names=[\"job_1\",\"job_2\", \"job_3\"]\n" +
                "//optional\n" +
                "machine_names=[\"machine_0\",\"machine_1\"]\n" +
                "//remember to return\n" +
                "return model.runBasic(jobs)";
        JSONObject jsonObject= getTestRes(script, idApi, scriptName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }

    /**
     * getRes api
     * normal input
     * @throws Exception mvc exception
     */
    @Test
    void getNormalRes1() throws Exception {
        JSONObject jsonObject= getTestRes(normalScript, idApi, scriptName);
        String uuid=jsonObject.getString("data");
        JSONObject normalRes= getTestRes(uuid, resApi, this.uuidName);
        Assertions.assertEquals(100, normalRes.get("code"));
    }

    /**
     * getRes api
     * normal input, but the schedule does not exist
     * @throws Exception mvc exception
     */
    @Test
    void getNormalRes2() throws Exception {
        String uuid="46103102098547836646218846680061";
        JSONObject normalRes= getTestRes(uuid, resApi, this.uuidName);
        Assertions.assertEquals(100, normalRes.get("code"));
    }

    /**
     * getRes api
     * normal input, all letters, the schedule does not exist
     * @throws Exception mvc exception
     */
    @Test
    void getNormalRes3() throws Exception {
        String uuid="abeccfsfdxrwqhjkbanmbvlpetreoega";
        JSONObject jsonObject= getTestRes(uuid, resApi, this.uuidName);
        Assertions.assertEquals(100, jsonObject.get("code"));
    }

    /**
     * getRes api
     * wrong input, contains space
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalRes1() throws Exception {
        String uuid="there is space";
        JSONObject jsonObject= getTestRes(uuid, resApi, this.uuidName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }

    /**
     * getRes api
     * wrong input, too short
     * @throws Exception mvc exception
     */
    @Test
    void getExceptionalRes2() throws Exception {
        String uuid="too12Shorttttttttttttt";
        JSONObject jsonObject= getTestRes(uuid, resApi, this.uuidName);
        Assertions.assertEquals(-1, jsonObject.get("code"));
    }
}