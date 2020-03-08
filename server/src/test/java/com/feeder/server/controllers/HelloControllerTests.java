package com.feeder.server.controllers;

import com.feeder.server.models.Hello;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class HelloControllerTests {

    @Autowired
    private HelloController subject;

    @Test
    public void testHello() {
        // act
        Hello response = subject.readHello();

        // assert
        assertEquals(response.getMessage(), "hello");
    }

}
