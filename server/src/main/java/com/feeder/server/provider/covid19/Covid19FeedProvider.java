package com.feeder.server.provider.covid19;

import com.feeder.server.model.CovidNineteenData;
import com.feeder.server.provider.FeedProvider;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
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
  // NZ Health Official Page
  private static final String COVID19_API_BASE_URL =
      "https://www.health.govt.nz/our-work/diseases-and-conditions/covid-19-novel-coronavirus/covid-19-current-situation/covid-19-current-cases#summary";
  private static final String COVID19_v3_MIME_TYPE = "application/vnd.github.v3+json";
  private static final Logger logger = LoggerFactory.getLogger(Covid19FeedProvider.class);
  private WebClient.Builder webClientBuilder;

  public Flux<CovidNineteenData> getFeed() {

    Map parsedData = parseData();

    CovidNineteenData data;
    CovidNineteenData.Builder builder = CovidNineteenData.newBuilder();

    builder.totalConfirmed((String) parsedData.get("totalConfirmed"));
    builder.newConfirmed((String) parsedData.get("newConfirmed"));
    builder.totalProbable((String) parsedData.get("totalProbable"));
    builder.newProbable((String) parsedData.get("newProbable"));
    builder.totalHospitalised((String) parsedData.get("totalHospitalised"));
    builder.newHospitalised((String) parsedData.get("newHospitalised"));
    builder.totalRecovered((String) parsedData.get("totalRecovered"));
    builder.newRecovered((String) parsedData.get("newRecovered"));
    builder.totalDeaths((String) parsedData.get("totalDead"));
    builder.newDeaths((String) parsedData.get("newDead"));

    data = builder.build();

    return Flux.just(data);
  }

  private Map parseData() {
    // Parse all the data from NZ Health Website and store in the map

    Map<String, String> parsedData = new HashMap<String, String>();

    Document doc = null;
    try {
      doc = Jsoup.connect(COVID19_API_BASE_URL).get();
    } catch (IOException e) {
      e.printStackTrace();
    }

    // select the first table (Summary Table).
    Element table = doc.select("table").get(0);
    Elements rows = table.select("tr");
    String lastUpdated = table.select("caption").get(0).text();
    System.out.print(lastUpdated);

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

        parsedData.put("totalConfirmed", cols.first().text());
        parsedData.put("newConfirmed", cols.last().text());

        // Probable
      } else if (r == 2) {

        parsedData.put("totalProbable", cols.first().text());
        parsedData.put("newProbable", cols.last().text());
        // Hospitalised
      } else if (r == 4) {

        parsedData.put("totalHospitalised", cols.first().text());
        parsedData.put("newHospitalised", cols.last().text());
        // Recovered
      } else if (r == 5) {

        parsedData.put("totalRecovered", cols.first().text());
        parsedData.put("newRecovered", cols.last().text());
        // Dead
      } else if (r == 6) {

        parsedData.put("totalDead", cols.first().text());
        parsedData.put("newDead", cols.last().text());
      }
    }
    return parsedData;
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
