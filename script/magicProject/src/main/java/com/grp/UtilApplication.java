package com.grp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Lazy;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@SpringBootApplication
@EnableAutoConfiguration()
@ComponentScan({"com.grp","org.ssssssss"})
//@EnableDiscoveryClient
//@RefreshScope
@EnableAsync
@EnableTransactionManagement
/**
 * start of the entire project
 */
@Lazy(true)
public class UtilApplication {

    public static void main(String[] args) {


        SpringApplication.run(UtilApplication.class, args);
    }

}
