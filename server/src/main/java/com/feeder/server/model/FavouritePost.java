package com.feeder.server.model;

import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@ToString
public class FavouritePost {

  @Id private String id;
  private String userId;

  private String media;
  private String title;
  private String username;
  private String mainText;
  private String relativeTime;

  private String mediaSourceLink;
  private String imageLink;
  private String avatarLink;

  // Constructors
  public FavouritePost() {};

  public FavouritePost(
      String userId,
      String media,
      String title,
      String mainText,
      String username,
      String relativeTime) {
    this.userId = userId;
    this.media = media;
    this.title = title;
    this.mainText = mainText;
    this.username = username;
    this.relativeTime = relativeTime;
  }

  // Reddit and Hackernews
  public FavouritePost(
      String userId,
      String media,
      String title,
      String mainText,
      String relativeTime,
      String username,
      String mediaSourceLink) {
    this(userId, media, title, mainText, username, relativeTime);
    this.mediaSourceLink = mediaSourceLink;
  }

  // Github and Twitter
  public FavouritePost(
      String userId,
      String media,
      String title,
      String mainText,
      String username,
      String relativeTime,
      String avatarLink,
      String mediaSourceLinkOrImageLink) {
    this(userId, media, title, mainText, username, relativeTime);
    this.avatarLink = avatarLink;

    if (media.contentEquals("github")) {
      this.mediaSourceLink = mediaSourceLinkOrImageLink;
    } else if (media.contentEquals("twitter")) {
      this.imageLink = mediaSourceLinkOrImageLink;
    }
  }

  public String getUserId() {
    return userId;
  }

  public String getId() {
    return id;
  }

  public String getTitle() {
    return title;
  }

  public String getUsername() {
    return username;
  }

  public String getMainText() {
    return mainText;
  }

  public String getDate() {
    return relativeTime;
  }

  public String getMediaSourceLink() {
    return mediaSourceLink;
  }

  public String getImageLink() {
    return imageLink;
  }

  public String getAvatarLink() {
    return avatarLink;
  }

  public void setUserId(java.lang.String userId) {
    this.userId = userId;
  }
}
