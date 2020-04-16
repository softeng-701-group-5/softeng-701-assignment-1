package com.feeder.server.service;

import com.feeder.server.model.FavouritePost;
import com.feeder.server.repository.FavouritePostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FavouritePostService {
    @Autowired
    FavouritePostRepository favouritePostRepository;

    public List<FavouritePost> getFavouritePosts(String uid) {
        return favouritePostRepository.findByUser(uid);
    }

    public void removePostFromFavourites(String id) {
        favouritePostRepository.deleteById(id);
    }

    public FavouritePost saveFavouritePost(FavouritePost favouritePost){
        favouritePostRepository.save(favouritePost);
    }

}
