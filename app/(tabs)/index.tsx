import { useWeather } from '@/context/WeatherContext';
import Container from '@/components/ui/Container';
import LoadingState from '@/components/ui/LoadingState';
import Section from '@/components/ui/Section';
import SearchSection from '@/components/weather/SearchSection';
import TemperatureDisplay from '@/components/weather/TemperatureDisplay';
import WeatherDescription from '@/components/weather/WeatherDescription';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { LocationResult } from '@/hooks/useLocation';
import { useWeatherAPI } from '@/hooks/useWeatherAPI';
import React from 'react';
import { Text } from 'react-native';

const fond = require('../../assets/images/fond.jpg');

export default function HomeScreen() {
  const {
    weatherData,
    setWeatherData,
    cityName,
    setCityName,
    isLoading,
    setIsLoading,
    error,
    setError
  } = useWeather();

  const {fetchWeatherData } = useWeatherAPI();

  const handleLocationFound = async (location: LocationResult, name: string) => {
    setIsLoading(true);
    setIsLoading(true);
    setError(null);
    setCityName(name);
    const data = await fetchWeatherData(location);
    if (data) {
      setWeatherData(data);
    } else {
      setError('Impossible de récupérer la météo');
    }

    setIsLoading(false);
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <Container backgroundImage={fond}>
      <Section style={{ flex: 2 }}>
        {isLoading ? (
          <LoadingState message="Chargement..." />
        ) : weatherData ? (
          <>
            <TemperatureDisplay temperature={weatherData.current_weather.temperature} city={cityName} />
            <WeatherIcon weatherCode={weatherData.current_weather.weathercode} size="medium" />
            <WeatherDescription weatherCode={weatherData.current_weather.weathercode} />
          </>
        ) : (
          <LoadingState message="Recherchez une ville ou utilisez votre position" />
        )}

        {error && (
          <Text style={{color: '#ff6b6b', textAlign: 'center', marginTop: 16 }}>
            {error}
          </Text>
        )}
      </Section>

      <Section style={{ flex: 2 }}>
        <SearchSection onLocationFound={handleLocationFound} onError={handleError} />
      </Section>

      <Section style={{ flex: 1 }}>
        {/* Espace pour les prévisions */}
        <></>
      </Section>
    </Container>
  )
}