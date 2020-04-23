package com.feeder.server.controller;

import com.feeder.server.model.user.AccessToken;
import com.feeder.server.model.user.User;
import com.feeder.server.service.UserService;
import java.util.ArrayList;
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
    List<AccessToken> accessTokens = new ArrayList<>();

    List<String> userHasAppToken = new ArrayList<>();
    List<AccessToken> userTokens = user.getAccessTokens();

    for (AccessToken token : userTokens) {
      if (token.getApp().contentEquals("reddit")) {
        userHasAppToken.add("reddit");
      }
      if (token.getApp().contentEquals("twitter")) {
        userHasAppToken.add("twitter");
      }
      if (token.getApp().contentEquals("github")) {
        userHasAppToken.add("github");
      }
    }

    if (!redditToken.isEmpty()) {
      accessTokens.add(new AccessToken("reddit", redditToken));
    }
    if (!twitterToken.isEmpty()) {
      accessTokens.add(new AccessToken("twitter", twitterToken));
    }
    if (!githubToken.isEmpty()) {
      accessTokens.add(new AccessToken("github", githubToken));
    }

    for (AccessToken t : accessTokens) {
      if (t.getApp().contentEquals("reddit") && userHasAppToken.contains("reddit")
          || (t.getApp().contentEquals("twitter") && userHasAppToken.contains("twitter"))
          || (t.getApp().contentEquals("github") && userHasAppToken.contains("github"))) {
        user.updateAccessToken(t);
      } else {
        user.addAccessToken(t);
      }
    }

    userService.updateUser(id, user);

    return userService.getUser(id);
  }
}
