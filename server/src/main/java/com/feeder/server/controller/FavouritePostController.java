package com.feeder.server.controller;

import com.feeder.server.service.FavouritePostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FavouritePostController {
    @Autowired private FavouritePostService favouritePostService;



}
