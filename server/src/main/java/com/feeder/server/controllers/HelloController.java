package com.feeder.server.controllers;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.models.Hello;
import com.feeder.server.providers.reddit.RedditFeedProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class HelloController {

    @Autowired private ApplicationProperties properties;
    @Autowired private RedditFeedProvider redditFeedProvider;

    @GetMapping
    public Hello readHello() {

        redditFeedProvider.getFeed(2);
        return new Hello("hello");
    }
}
