package com.feeder.server.repository;

import com.feeder.server.model.FavouritePost;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavouritePostRepository extends MongoRepository<FavouritePost, String> {
  List<FavouritePost> findByUserId(String uid);
}
