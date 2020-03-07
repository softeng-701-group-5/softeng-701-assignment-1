package com.feeder.server.controllers;

import com.feeder.server.models.Hello;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class HelloControllerTests {

    private HelloController subject;

    @BeforeEach
    public void setUp() {
        this.subject = new HelloController();
    }

    @Test
    public void testHello() {
        // act
        Hello response = subject.readHello();

        // assert
        assertEquals(response.getMessage(), "hello");
    }

}
