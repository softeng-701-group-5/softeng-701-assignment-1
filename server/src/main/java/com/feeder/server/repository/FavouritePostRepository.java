package com.feeder.server.repository;

import com.feeder.server.model.FavouritePost;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavouritePostRepository extends MongoRepository<FavouritePost, String> {
    List<FavouritePost> findByUser(String uid);
}
