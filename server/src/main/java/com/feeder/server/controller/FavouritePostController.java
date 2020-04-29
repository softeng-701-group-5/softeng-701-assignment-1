package com.feeder.server.controller;

import com.feeder.server.model.FavouritePost;
import com.feeder.server.service.FavouritePostService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class FavouritePostController {
  @Autowired private FavouritePostService favouritePostService;

  @PostMapping("/favourites/user/{uid}")
  public void saveFavouritePost(
      @PathVariable("uid") String uid, @RequestBody FavouritePost favouritePost) {
    favouritePost.setUserId(uid);
  }

  @GetMapping("/favourites/user/{uid}")
  @ResponseBody
  public List<FavouritePost> getFavouritePosts(@PathVariable("uid") String uid) {
    return favouritePostService.getFavouritePosts(uid);
  }

  // This removes a post from a user's favourites by using the post id
  @DeleteMapping("/favourites/{id}")
  public void deletePostFromFavourites(@PathVariable("id") String id) {
    favouritePostService.removePostFromFavourites(id);
  }
}
