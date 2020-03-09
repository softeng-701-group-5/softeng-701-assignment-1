package com.feeder.server.controllers;

import com.feeder.server.ApplicationProperties;
import com.feeder.server.models.Hello;
import com.feeder.server.providers.reddit.RedditFeedProvider;
import net.dean.jraw.models.Listing;
import net.dean.jraw.models.Submission;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hello")
public class HelloController {

    private static final Logger logger = LoggerFactory.getLogger(HelloController.class);
    @Autowired private ApplicationProperties properties;
    @Autowired private RedditFeedProvider redditFeedProvider;

    @GetMapping
    public Hello readHello() {

        List<Listing<Submission>> items = redditFeedProvider.getFeed(2);
        items.forEach(s -> logger.info(s.toString()));
        return new Hello("hello");
    }
}
