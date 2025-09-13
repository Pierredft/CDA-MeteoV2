import AddToFavoritesButton from '@/components/favorites/AddToFavoritesButton';
import Container from '@/components/ui/Container';
import LoadingState from '@/components/ui/LoadingState';
import Section from '@/components/ui/Section';
import SearchSection from '@/components/weather/SearchSection';
import TemperatureDisplay from '@/components/weather/TemperatureDisplay';
import WeatherDescription from '@/components/weather/WeatherDescription';
import WeatherIcon from '@/components/weather/WeatherIcon';
import { useWeather } from '@/context/WeatherContext';
import { useFavorites } from '@/hooks/useFavorites';
import { LocationResult } from '@/hooks/useLocation';
import React from 'react';
import { Text } from 'react-native';

const fond = require('../../assets/images/fond.jpg');

export default function HomeScreen() {
    const {
        weatherData,
        setWeatherData,
        cityName,
        setCityName,
        setcurrentLocation,
        isLoading,
        setIsLoading,
        error,
        setError
    } = useWeather();

    const handleLocationFound = async (location: LocationResult, name: string) => {
        setIsLoading(true);
        setError(null);
        setCityName(name);
        setcurrentLocation(location);

        try{
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relative_humidity_2m&timezone=auto&forecast_days=7`);

        if(!response.ok) {
            throw new Error(`Erreur API: ${response.status}`);
        }
        const data = await response.json();

        if (!data.current_weather) {
            throw new Error('Données météo actuelles non disponibles');
        }

        setWeatherData(data);
        } catch (error) {
        const message = error instanceof Error ? error.message : 'Erreur inconnue';
        setError(`Impossible de récupérer la météo: ${message}`);
        } finally {
        setIsLoading(false);
        }
    };

    const handleError = (errorMessage: string) => {
        setError(errorMessage);
    };

    const {
        addCurrentLocation,
        isCurrentLocationInFavorites
    } = useFavorites();

    const handleAddToFavorites = async () => {
        await addCurrentLocation();
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
            {weatherData && (
            <AddToFavoritesButton
                onPress={handleAddToFavorites}
                isInFavorites={isCurrentLocationInFavorites}
            />
            )}
        </Section>
        </Container>
    )
}