package com.feeder.server.model;


import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@ToString
public class FavouritePost {

  @Id private String id;
  private String userId;

  private String mediaType;
  private String title;
  private String username;
  private String mainText;
  private String date;

  private String mediaSourceLink;
  private String imageLink;
  private String avatarLink;

  // Constructors
  public FavouritePost() {};

  public FavouritePost(
      String userId,
      String mediaType,
      String title,
      String mainText,
      String username,
      String date) {
    this.userId = userId;
    this.mediaType = mediaType;
    this.title = title;
    this.mainText = mainText;
    this.username = username;
    this.date = date;
  }

  // Reddit and Hackernews
  public FavouritePost(
      String userId,
      String mediaType,
      String title,
      String mainText,
      String date,
      String username,
      String mediaSourceLink) {
    this(userId, mediaType, title, mainText, username, date);
    this.mediaSourceLink = mediaSourceLink;
  }

  // Github and Twitter
  public FavouritePost(
      String userId,
      String mediaType,
      String title,
      String mainText,
      String username,
      String date,
      String avatarLink,
      String mediaSourceLinkOrImageLink) {
    this(userId, mediaType, title, mainText, username, date);
    this.avatarLink = avatarLink;

    if (mediaType.contentEquals("github")) {
      this.mediaSourceLink = mediaSourceLinkOrImageLink;
    } else if (mediaType.contentEquals("twitter")) {
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
    return date;
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
}
