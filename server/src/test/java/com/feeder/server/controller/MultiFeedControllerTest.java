package com.feeder.server.controller;


import com.feeder.server.model.DemoData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.reactive.server.WebTestClient;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.http.HttpClient;

import static org.junit.jupiter.api.Assertions.assertEquals;

@RunWith(SpringRunner.class)
@WebFluxTest(MultiFeedControllerTest.class)
public class MultiFeedControllerTest {

    @Autowired
    WebTestClient webTestClient;


    private HttpURLConnection client;

    @BeforeEach
    public void setup(){
        client = null;
    }



    @Test
    public void testDemoSerialisation(){
        DemoData demoData = (DemoData )webTestClient.get()
                .uri("http://localhost:8080/demo")
                .exchange()
                .expectStatus()
                .isOk()
                .expectBody(DemoData.class);



        assertEquals(demoData.title(),"cat");
        assertEquals(demoData.imageURI(), "http://cat.jpg");
        assertEquals(demoData.feedType(), "DEMO");
    }


}
