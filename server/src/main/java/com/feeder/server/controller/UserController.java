package com.feeder.server.controller;

import com.feeder.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import com.feeder.server.model.User;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user/{id}")
    public User getUser(@PathVariable("id") String id){
        return userService.getUser(id);
    }

    @PostMapping("/user")
    public void saveUser(@RequestBody User user){ userService.saveUser(user); }

    @PutMapping("/user/{id}")
    public void updateUser(@PathVariable("id") String id, @RequestBody User user){ userService.updateUser(id, user); }
}