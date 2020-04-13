package com.feeder.server.provider.twitter;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.AdditionalAnswers.delegatesTo;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

import com.feeder.server.model.TwitterData;
import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import reactor.core.publisher.Flux;
import twitter4j.MediaEntity;
import twitter4j.ResponseList;
import twitter4j.Status;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.User;

@WebFluxTest(controllers = TwitterFeedProvider.class)
@ExtendWith(MockitoExtension.class)
public class TwitterFeedProviderTest {

  @MockBean private Twitter mockTwitterClient;
  @Mock private Status mockStatus;
  @Mock private User mockUser;
  @Mock private MediaEntity mockMediaEntity;
  @Autowired private TwitterFeedProvider subject;

  @BeforeEach
  public void setUp() throws TwitterException {
    List<Status> concreteResponseList = new ArrayList<>();
    concreteResponseList.add(mockStatus);
    ResponseList<Status> mockResponseList =
        mock(ResponseList.class, delegatesTo(concreteResponseList));

    when(mockTwitterClient.getHomeTimeline()).thenReturn(mockResponseList);
    when(mockUser.getName()).thenReturn("testUser");
    when(mockUser.get400x400ProfileImageURL()).thenReturn("testProfileImageURL");
    when(mockMediaEntity.getMediaURLHttps()).thenReturn("testURL");
    when(mockStatus.getUser()).thenReturn(mockUser);
    when(mockStatus.getMediaEntities()).thenReturn(new MediaEntity[] {mockMediaEntity});
    when(mockStatus.getText()).thenReturn("testText");
    when(mockStatus.getCreatedAt()).thenReturn(Date.from(Instant.EPOCH));
  }

  @Test
  public void testGetFeed() {
    int expectedNumberOfStatuses = 1;
    Flux<TwitterData> mockFeed = subject.getFeed();

    assertEquals(expectedNumberOfStatuses, mockFeed.collectList().block().size());
  }

  @Test
  public void testFeedCaching() {
    Flux<TwitterData> mockFeed = subject.getFeed();

    assertEquals(mockFeed.collectList().block().size(), subject.getLastResponse().size());
  }
}
