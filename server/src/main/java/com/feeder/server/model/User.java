package com.feeder.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class User {
  @Id private String uid;
  private String profilePicture;
  private String name;
  private String gridLayout;
  private String theme;

  public User(String uid, String profilePicture, String name, String gridLayout, String theme) {
    this.uid = uid;
    this.profilePicture = profilePicture;
    this.name = name;
    this.gridLayout = gridLayout;
    this.theme = theme;
  }

  public void setId(String id) {
    this.uid = id;
  }

  public String getUid() {
    return uid;
  }

  public String getProfilePicture() {
    return profilePicture;
  }

  public String getName() {
    return name;
  }

  public String getGridLayout() {
    return gridLayout;
  }

  public String getTheme() {
    return theme;
  }

  @Override
  public String toString() {
    return uid;
  }
}
