package com.feeder.server.model.user;

import java.util.ArrayList;
import java.util.List;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@ToString
public class User {
  @Id private String uid;
  private String profilePicture;
  private String name;
  private String gridLayout;
  private String theme;
  private List<AccessToken> accessTokens = new ArrayList<>();

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

  public List<AccessToken> getAccessTokens() {
    return this.accessTokens;
  }

  public void addAccessToken(AccessToken accessToken) {
    this.accessTokens.add(accessToken);
  }

  public void updateAccessToken(AccessToken accessToken) {
    String appType = accessToken.getApp();
    for (AccessToken token : accessTokens) {
      if (token.getApp().equals(appType)) {
        token.setToken(accessToken.getToken());
      }
    }
  }
}
