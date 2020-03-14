package com.feeder.server.model;

import com.feeder.server.provider.github.GithubFeedProvider;

import java.util.Optional;

public abstract class GithubData extends GenericData {



    /*Does not make sense for now. The model feels more
    * like an interface to map the frontend to the variables
    * I should ask Chinmay before making and pushing messed up logic for getting
    * event data. Do not know how to test as well*/

//    private GithubFeedProvider githubfeedProvider;
//
//
//    public void getFeed(){
//        this.githubfeedProvider = new GithubFeedProvider();
//        System.out.println(githubfeedProvider.getFeed());
//
//    }

    /*Based on DemoData.java
    JSON properties to be added once approved
    */

    @Override
    public Type feedType() {return Type.GITHUB;}

    public abstract String eventType();
    public abstract String eventURL();
    public abstract Optional <String> eventDescription();
    public abstract String eventDate();
    public abstract String userName();
    public abstract String userAvatar();
}
