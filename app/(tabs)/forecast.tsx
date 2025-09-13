// app/(tabs)/forecast.tsx
import Container from "@/components/ui/Container";
import LoadingState from "@/components/ui/LoadingState";
import ForecastHeader from "@/components/weather/ForecastHeader";
import ForecastList from "@/components/weather/ForecastList";
import { useWeather } from "@/context/WeatherContext";
import React, { useMemo } from "react";

const fond = require('../../assets/images/fondPrev.jpg');

export default function ForecastScreen() {
  const { weatherData, cityName, isLoading } = useWeather();

  // Transformation des données avec UseMemo pour optimiser les performances
  const forecastData = useMemo(() => {
    if (!weatherData?.daily) return [];

    return weatherData.daily.time.map((date, index) => ({
      id: date,
      date,
      weatherCode: weatherData.daily!.weathercode[index],
      tempMax: weatherData.daily!.temperature_2m_max[index],
      tempMin: weatherData.daily!.temperature_2m_min[index],
    }));
  }, [weatherData]);

  if (isLoading) {
    return (
      <Container backgroundImage={fond}>
        <LoadingState message="Chargement des prévisions..." />
      </Container>
    );
  }

  if (!weatherData?.daily || forecastData.length === 0) {
    return (
      <Container backgroundImage={fond}>
        <LoadingState message="Aucune donnée de prévision disponible." />
      </Container>
    );
  }

  return (
    <Container backgroundImage={fond}>
      <ForecastHeader cityName={cityName || 'Ville inconnue'} />
      <ForecastList forecastData={forecastData} />
    </Container>
    )
  }