package com.feeder.server.controller;

import com.feeder.server.model.user.AccessToken;
import com.feeder.server.model.user.User;
import com.feeder.server.service.UserService;
import java.util.List;
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
  public User addAccessToken(
      @PathVariable("id") String id,
      @CookieValue(name = "feedr_reddit_token", defaultValue = "") String redditToken,
      @CookieValue(name = "feedr_twitter_token", defaultValue = "") String twitterToken,
      @CookieValue(name = "feedr_github_token", defaultValue = "") String githubToken) {

    User user = userService.getUser(id);
    AccessToken accessToken = null;

    // Ensure only one token for each app is saved
    Boolean[] tokenForAppExists = new Boolean[3];
    List<AccessToken> tokens = user.getAccessTokens();
    for (AccessToken token : tokens) {
      if (token.getApp().contentEquals("reddit")) {
        tokenForAppExists[0] = true;
      } else if (token.getApp().contentEquals("twitter")) {
        tokenForAppExists[1] = true;
      } else if (token.getApp().contentEquals("github")) {
        tokenForAppExists[2] = true;
      }
    }

    if (!redditToken.isEmpty() && !tokenForAppExists[0]) {
      accessToken = new AccessToken("reddit", redditToken);
    } else if (!twitterToken.isEmpty() && !tokenForAppExists[1]) {
      accessToken = new AccessToken("twitter", twitterToken);
    } else if (!githubToken.isEmpty() && !tokenForAppExists[2]) {
      accessToken = new AccessToken("github", githubToken);
    }

    if (accessToken != null) {
      user.addAccessToken(accessToken);

      userService.updateUser(id, user);
    }

    return userService.getUser(id);
  }
}
