package com.feeder.server.service;

import com.feeder.server.model.FavouritePost;
import com.feeder.server.repository.FavouritePostRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FavouritePostService {
  @Autowired FavouritePostRepository favouritePostRepository;

  public List<FavouritePost> getFavouritePosts(String uid) {
    return favouritePostRepository.findByUserId(uid);
  }

  public void removePostFromFavourites(String id) {
    favouritePostRepository.deleteById(id);
  }

  public FavouritePost saveFavouritePost(FavouritePost favouritePost) {
    return favouritePostRepository.save(favouritePost);
  }
}
