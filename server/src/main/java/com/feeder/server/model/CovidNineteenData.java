package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

/** A CovidNineteenData type represents properties of the web scraped covid19 data */
@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_CovidNineteenData.Builder.class)
public abstract class CovidNineteenData extends GenericData {

    public static Builder newBuilder() { return new AutoValue_CovidNineteenData.Builder(); }

    @Override
    public Type feedType() { return Type.COVIDNINETEEN; }

    /** These properties are required for serialization, all posts must contain them. */
    @JsonProperty("totalConfirmed")
    public abstract String totalConfirmed();

    @JsonProperty("totalDeaths")
    public abstract String totalDeaths();

    @JsonProperty("totalProbable")
    public abstract String totalProbable();

    @JsonProperty("totalRecovered")
    public abstract String totalRecovered();

    @JsonProperty("totalHospitalised")
    public abstract String totalHospitalised();

    @JsonProperty("newConfirmed")
    public abstract String newConfirmed();

    @JsonProperty("newDeaths")
    public abstract String newDeaths();

    @JsonProperty("newProbable")
    public abstract String newProbable();

    @JsonProperty("newRecovered")
    public abstract String newRecovered();

    @JsonProperty("newHospitalised")
    public abstract String newHospitalised();

    @AutoValue.Builder
    @JsonPOJOBuilder(withPrefix = "")
    public interface Builder {
        CovidNineteenData.Builder totalConfirmed(String totalConfirmed);

        CovidNineteenData.Builder totalDeaths(String totalDeaths);

        CovidNineteenData.Builder totalProbable(String totalProbable);

        CovidNineteenData.Builder totalRecovered(String totalRecovered);

        CovidNineteenData.Builder totalHospitalised(String totalHospitalised);

        CovidNineteenData.Builder newConfirmed(String newConfirmed);

        CovidNineteenData.Builder newDeaths(String newDeaths);

        CovidNineteenData.Builder newProbable(String newProbable);

        CovidNineteenData.Builder newRecovered(String newRecovered);

        CovidNineteenData.Builder newHospitalised(String newHospitalised);

        CovidNineteenData build();
    }
}
