package com.feeder.server.controller;

import com.feeder.server.model.FavouritePost;
import com.feeder.server.service.FavouritePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class FavouritePostController {
    @Autowired private FavouritePostService favouritePostService;

    @PostMapping("/favourites")
    public FavouritePost saveFavouritePost(@RequestBody FavouritePost favouritePost){
        return favouritePostService.saveFavouritePost(favouritePost);
    }

    @GetMapping("/user/{id}/favourites")
    public List<FavouritePost> getFavouritePosts(@PathVariable("id") String uid){
        return favouritePostService.getFavouritePosts(uid);
    }

    @DeleteMapping("/favourites/{id}")
    public void deletePostFromFavourites(@PathVariable("id") String id) {
        favouritePostService.removePostFromFavourites(id);
    }

}
