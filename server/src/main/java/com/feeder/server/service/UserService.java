package com.feeder.server.service;

import com.feeder.server.model.User;
import com.feeder.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public User getUser(String id){ return userRepository.findByUid(id); }

    public void saveUser(User user){ userRepository.save(user); }

    public void updateUser(String id, User user){
        user.setId(id);
        userRepository.save(user);
    }
}
