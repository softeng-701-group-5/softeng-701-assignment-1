package com.feeder.server.models;

import java.net.URI;

public abstract class GenericData {

    public enum Type{REDDIT, GITHUB, SPOTIFY, TWITTER}


    public String title;
    public URI imageURI;
    public String description;
    public Type feedType;




}
