package com.feeder.server.provider.covid19;

import com.feeder.server.model.CovidNineteenData;
import com.feeder.server.provider.FeedProvider;
import java.io.IOException;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;

@Service
public class Covid19FeedProvider implements FeedProvider<CovidNineteenData> {

  private static final String COVID19_API_BASE_URL =
      " https://coronavirus-19-api.herokuapp.com/countries/New%20Zealand";
  private static final String COVID19_v3_MIME_TYPE = "application/vnd.github.v3+json";
  private static final Logger logger = LoggerFactory.getLogger(Covid19FeedProvider.class);
  private WebClient.Builder webClientBuilder;

  public Flux<CovidNineteenData> getFeed() {
    // NZ Health Official Page
    String blogUrl =
        "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases#summary";

    Document doc = null;
    try {
      doc = Jsoup.connect(blogUrl).get();
    } catch (IOException e) {
      e.printStackTrace();
    }

    // select the first table (Summary Table).
    Element table = doc.select("table").get(0);
    Elements rows = table.select("tr");
    String lastUpdated = table.select("caption").get(0).text();
    System.out.print(lastUpdated);

    // Fields Required to Scrape
    String totalConfirmed = null;
    String newConfirmed = null;
    String totalProbable = null;
    String newProbable = null;
    String totalRecovered = null;
    String newRecovered = null;
    String totalHospitalised = null;
    String newHospitalised = null;
    String totalDead = null;
    String newDead = null;

    Element row;
    Elements cols;

    for (int r = 1; r < rows.size(); r++) {
      row = rows.get(r);
      cols = row.select("td");

      // Replace Empty Fields with 0
      if (cols.first().text().equals("")) {
        cols.first().text("0");
      }
      if (cols.last().text().equals("")) {
        cols.first().text("0");
      }

      // Confirmed
      if (r == 1) {
        totalConfirmed = cols.first().text();
        newConfirmed = cols.last().text();
        // Probable
      } else if (r == 2) {
        totalProbable = cols.first().text();
        newProbable = cols.last().text();
        // Hospitalised
      } else if (r == 4) {
        totalHospitalised = cols.first().text();
        newHospitalised = cols.last().text();
        // Recovered
      } else if (r == 5) {
        totalRecovered = cols.first().text();
        newRecovered = cols.last().text();
        // Dead
      } else if (r == 6) {
        totalDead = cols.first().text();
        newDead = cols.last().text();
      }
    }

    CovidNineteenData data;
    CovidNineteenData.Builder builder = CovidNineteenData.newBuilder();

    builder.totalConfirmed(totalConfirmed);
    builder.newConfirmed(newConfirmed);
    builder.totalProbable(totalProbable);
    builder.newProbable(newProbable);
    builder.totalHospitalised(totalHospitalised);
    builder.newHospitalised(newHospitalised);
    builder.totalRecovered(totalRecovered);
    builder.newRecovered(newRecovered);
    builder.totalRecovered(totalRecovered);
    builder.newRecovered(newRecovered);
    builder.totalDeaths(totalDead);
    builder.newDeaths(newDead);

    data = builder.build();

    return Flux.just(data);
    //    Flux.create(data);
    //    return data;
  }

  private WebClient.Builder getWebClientBuilder() {
    if (this.webClientBuilder == null) {
      this.webClientBuilder =
          WebClient.builder()
              .baseUrl(COVID19_API_BASE_URL)
              .defaultHeader(HttpHeaders.CONTENT_TYPE, COVID19_v3_MIME_TYPE);
    }
    return this.webClientBuilder;
  }
}
