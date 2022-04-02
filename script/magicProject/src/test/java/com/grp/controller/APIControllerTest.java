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
 * Test getRes api in script language
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

    private final String normalScript="decision_var start = 0\n" +
            "decision_var end = 5\n" +
            "//task=[machine_id, duration]\n" +
            "job1=[[0, 3], [1, 2], [2, 2]]\n" +
            "job2=[[0, 2], [2, 1], [1, 4]]\n" +
            "job3=[[1, 4], [2, 3]]\n" +
            "jobs=[job1,job2,job3]\n" +
            "\n" +
            "//optional\n" +
            "job_names=[\"job_aaa\",\"job_bbb\", \"job_ccc\"]\n" +
            "//optional\n" +
            "machine_names=[\"machine_0\",\"machine_1\", \"machine_2\"]\n" +
            "\n" +
            "myformat=algorithm.standardize(jobs)\n" +
            "js_jobs=myformat.jobs\n" +
            "js_machines=myformat.machines\n" +
            "\n" +
            "basic {\n" +
            "    //precedence constraint\n" +
            "    for (job in js_jobs) {\n" +
            "        for (index in range(0, (count(job)-2))) {\n" +
            "            print(index)\n" +
            "            job[index+1].start>=job[index].end\n" +
            "        }\n" +
            "    }\n" +
            "\n" +
            "    //no overlap constraint\n" +
            "    for (machine in js_machines) {\n" +
            "        for (index in range(0, (count(machine)-2))) {\n" +
            "            mahine[index+1].start>=machine[index].end\n" +
            "        }\n" +
            "    }\n" +
            "    \n" +
            "}\n" +
            "subject_to {\n" +
            "  2*js_jobs[0][0].start<=5;\n" +
            "  1*js_jobs[0][1].end>10;\n" +
            "}\n" +
            "//remember to return\n" +
            "return model.runModel(type=1, originalData=myformat)";
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