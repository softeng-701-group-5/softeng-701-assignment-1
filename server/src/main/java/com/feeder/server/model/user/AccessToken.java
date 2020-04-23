package com.feeder.server.model.user;

import lombok.ToString;

@ToString
public class AccessToken {
  private String app;
  private String token;

  public AccessToken() {}

  public AccessToken(String app, String token) {
    this.app = app;
    this.token = token;
  }

  public String getApp() {
    return this.app;
  }

  public String getToken() {
    return this.token;
  }

  public void setApp(String app) {
    this.app = app;
  }

  public void setToken(String token) {
    this.token = token;
  }
}
