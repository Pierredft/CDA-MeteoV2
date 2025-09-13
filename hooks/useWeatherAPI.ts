import { useState } from 'react';
import { Location, WeatherData } from './types/weather';

export function useWeatherAPI() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchWeatherData = async (location: Location): Promise<WeatherData | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relative_humidity_2m&timezone=auto&forecast_days=7`
            );

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }

            const data = await response.json();

            if (!data.current_weather) {
                throw new Error('Données météo incomplètes');
            }

            return data;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Erreur inconnue';
            setError(message);
            return null;
        } finally {
            setIsLoading(false);
        }
    };
    return {
    fetchWeatherData,
    isLoading,
    error,
    };
}