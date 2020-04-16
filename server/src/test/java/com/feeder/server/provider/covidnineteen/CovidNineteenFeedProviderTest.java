package com.feeder.server.provider.covidnineteen;

import static org.junit.jupiter.api.Assertions.assertEquals;

import com.feeder.server.model.CovidNineteenData;
import com.feeder.server.provider.covid19.Covid19FeedProvider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.WebFluxTest;
import org.springframework.boot.test.context.SpringBootTest;
import reactor.core.publisher.Flux;


@WebFluxTest(controllers = Covid19FeedProvider.class)
@ExtendWith(MockitoExtension.class)
public class CovidNineteenFeedProviderTest {

    @Autowired private Covid19FeedProvider subject;


    @Test
    public void testGetFeed() {
        int expectedNumberOfStatuses = 1;

        Flux<CovidNineteenData> mockFeed = subject.getFeed();

        assertEquals(expectedNumberOfStatuses, mockFeed.collectList().block().size());
    }
}