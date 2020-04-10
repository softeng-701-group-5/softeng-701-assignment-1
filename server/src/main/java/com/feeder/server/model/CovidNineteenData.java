package com.feeder.server.model;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonPOJOBuilder;
import com.google.auto.value.AutoValue;

@AutoValue
@JsonInclude(JsonInclude.Include.NON_ABSENT)
@JsonDeserialize(builder = AutoValue_CovidNineteenData.Builder.class)
public abstract class CovidNineteenData extends GenericData {

    public static Builder newBuilder() { return new AutoValue_CovidNineteenData.Builder(); }

    @Override
    public Type feedType() { return Type.COVIDNINETEEN; }

    @JsonProperty("totalConfirmed")
    public abstract int totalConfirmed();

    @JsonProperty("totalDeaths")
    public abstract int totalDeaths();

    @JsonProperty("totalProbable")
    public abstract int totalProbable();

    @JsonProperty("totalRecovered")
    public abstract int totalRecovered();

    @JsonProperty("totalHospitalised")
    public abstract int totalHospitalised();

    @JsonProperty("newConfirmed")
    public abstract int newConfirmed();

    @JsonProperty("newDeaths")
    public abstract int newDeaths();

    @JsonProperty("newProbable")
    public abstract int newProbable();

    @JsonProperty("newRecovered")
    public abstract int newRecovered();

    @JsonProperty("newHospitalised")
    public abstract int newHospitalised();

    @AutoValue.Builder
    @JsonPOJOBuilder(withPrefix = "")
    public interface Builder {
        CovidNineteenData.Builder totalConfirmed(int totalConfirmed);

        CovidNineteenData.Builder totalDeaths(int totalDeaths);

        CovidNineteenData.Builder totalProbable(int totalProbable);

        CovidNineteenData.Builder totalRecovered(int totalRecovered);

        CovidNineteenData.Builder totalHospitalised(int totalHospitalised);

        CovidNineteenData.Builder newConfirmed(int newConfirmed);

        CovidNineteenData.Builder newDeaths(int newDeaths);

        CovidNineteenData.Builder newProbable(int newProbable);

        CovidNineteenData.Builder newRecovered(int newRecovered);

        CovidNineteenData.Builder newHospitalised(int newHospitalised);

        CovidNineteenData build();
    }
}
