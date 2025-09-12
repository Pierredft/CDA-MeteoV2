import Container from '@/components/ui/Container';
import LoadingState from '@/components/ui/LoadingState';
import Section from '@/components/ui/Section';
import SearchSection from '@/components/weather/SearchSection';
import TemperatureDisplay from '@/components/weather/TemperatureDisplay';
import WeatherDescription from '@/components/weather/WeatherDescription';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { WeatherData } from '@/hooks/types/weather';
import { LocationResult } from '@/hooks/useLocation';
import React, { useState } from 'react';
import { Text } from 'react-native';

const fond = require('../../assets/images/fond.jpg');

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cityName, setCityName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLocationFound = async (location: LocationResult, name: string) => {
    setIsLoading(true);
    setError(null);
    setCityName(name);

    try {
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&timezone=auto`);

      if (!response.ok) {
        throw new Error('Erreur météo');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch {
      setError('impossible de récupérer la météo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
    setIsLoading(false);
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