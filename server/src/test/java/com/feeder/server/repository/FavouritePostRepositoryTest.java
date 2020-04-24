package com.feeder.server.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.feeder.server.model.FavouritePost;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ExtendWith(SpringExtension.class)
@DataMongoTest
public class FavouritePostRepositoryTest {
  @Autowired private FavouritePostRepository favouritePostRepository;

  @BeforeEach
  public void dataSetup() {
    String uid = "1";
    String mediaType = "reddit";
    String title = "New thread on blah";
    String mainText = "Text here";
    String date = "2020-03-23'T'12:34:21+0200";
    String username = "RedditUser";
    String mediaSourceLink = "link";
    FavouritePost favouritePost =
        new FavouritePost(uid, mediaType, title, mainText, date, username, mediaSourceLink);

    favouritePostRepository.save(favouritePost);
  }

  @Test
  public void testSavePost() {
    List<FavouritePost> posts = favouritePostRepository.findByUserId("1");
    assertEquals(1, posts.size());
    assertEquals("1", posts.get(0).getUserId());
  }

  @Test
  public void testRemovePost() {
    List<FavouritePost> posts = favouritePostRepository.findByUserId("1");
    favouritePostRepository.deleteById(posts.get(0).getId());
    assertEquals(posts.size() - 1, favouritePostRepository.findByUserId("1").size());
  }
}
