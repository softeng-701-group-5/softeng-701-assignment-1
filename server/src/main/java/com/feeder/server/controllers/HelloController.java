package com.feeder.server.controllers;

import com.feeder.server.models.Hello;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @GetMapping
    public Hello readHello() {
        return new Hello("hello");
    }
}
