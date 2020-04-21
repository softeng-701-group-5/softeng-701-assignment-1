package com.feeder.server.controller;

import com.feeder.server.model.user.AccessToken;
import com.feeder.server.model.user.User;
import com.feeder.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

  @Autowired private UserService userService;

  @GetMapping("/user/{id}")
  public User getUser(@PathVariable("id") String id) {
    return userService.getUser(id);
  }

  @PutMapping("/user/{id}")
  public void updateUser(@PathVariable("id") String id, @RequestBody User user) {
    userService.updateUser(id, user);
  }

  @PutMapping("/user/{id}/token")
  public void addAccessToken(
      @PathVariable("id") String id,
      @CookieValue(name = "feedr_reddit_token", defaultValue = "") String redditToken,
      @CookieValue(name = "feedr_twitter_token", defaultValue = "") String twitterToken,
      @CookieValue(name = "feedr_github_token", defaultValue = "") String githubToken) {

    AccessToken accessToken = new AccessToken();
    // Check if tokens are not null
    if (!redditToken.isEmpty()) {
      accessToken.setApp("reddit");
      accessToken.setToken(redditToken);
    } else if (!twitterToken.isEmpty()) {
      accessToken.setApp("twitter");
      accessToken.setToken(twitterToken);
    } else if (!githubToken.isEmpty()) {
      accessToken.setApp("github");
      accessToken.setToken(githubToken);
    }

    if (!accessToken.getApp().isEmpty()) {
      User user = userService.getUser(id);
      user.addAccessToken(accessToken);

      userService.updateUser(id, user);
    }
  }
}
