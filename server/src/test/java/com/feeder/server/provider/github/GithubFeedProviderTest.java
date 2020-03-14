package com.feeder.server.provider.github;


import com.feeder.server.model.GithubData;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class GithubFeedProviderTest {

    @Autowired
    private WebTestClient webTestClient;

    /**
     * Testing the response received after sending a get request to the github
     * endpoint. The number of responses received from the api are 30 for the dummy
     * user. The line to check that can be removed if the username and password
     * in application.properties for github is for the Dummy User created.
     */
    @Test
    public void testEventResponse() {
        webTestClient.get()
                .uri("/github")
                .accept(MediaType.APPLICATION_JSON)
                .exchange()
                .expectStatus().isOk()
                .expectHeader().contentType(MediaType.APPLICATION_JSON)
                .expectBodyList(GithubData.class)
                .hasSize(30);
    }

}
