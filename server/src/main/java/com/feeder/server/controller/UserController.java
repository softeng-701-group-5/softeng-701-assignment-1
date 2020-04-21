package com.feeder.server.controller;

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
}
