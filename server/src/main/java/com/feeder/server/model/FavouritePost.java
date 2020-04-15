package com.feeder.server.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class FavouritePost {

    @Id
    private String id;
    private String userId;

    private String mediaType;
    private String title;
    private String username;
    private String mainText;
    private Date date;

    private String mediaSourceLink;
    private String imageLink;
    private String avatarLink;

    // Constructors
    public FavouritePost(String id, String userId, String mediaType, String title, String mainText, String username,
                         Date date) {
        this.id = id;
        this.userId = userId;
        this.mediaType = mediaType;
        this.title = title;
        this.mainText = mainText;
        this.username = username;
        this.date = date;
    }

    // Reddit and Hackernews
    public FavouritePost(String id, String userId, String mediaType, String title, String mainText, Date date,
                         String username, String mediaSourceLink) {
        this(id, userId, mediaType, title, mainText, username, date);
        this.mediaSourceLink = mediaSourceLink;
    }

    // Github
    public FavouritePost(String id, String userId, String mediaType, String title, String mainText, String username,
                         String avatarLink, String mediaSourceLink, Date date) {
        this(id, userId, mediaType, title, mainText, username, date);
        this.avatarLink = avatarLink;
        this.mediaSourceLink = mediaSourceLink;
    }

    // Twitter
    public FavouritePost(String id, String userId, String mediaType, String title, String mainText, Date date,
                         String username, String imageLink, String avatarLink) {
        this(id, userId, mediaType, title, mainText, username, date);
        this.imageLink = imageLink;
        this.avatarLink = avatarLink;
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

    public Date getDate() {
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

    @Override
    public String toString() {
        return id;
    }
}
