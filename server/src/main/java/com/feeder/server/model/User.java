package com.feeder.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User{

    @Id
    private String uid;

    private String profilePicture;
    private String name;

    public User(String uid, String profilePicture, String name){
        this.uid = uid;
        this.profilePicture = profilePicture;
        this.name = name;
    }

    public void setId(String id){ this.uid = id; }

    @Override
    public String toString(){ return uid; }
}