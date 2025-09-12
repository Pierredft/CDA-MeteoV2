import { useState } from 'react';

export interface CityResult {
    name: string;
    country: string;
    latitude: number;
    longitude: number;
}

export function useGeocode() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const searchCity = async (cityName: string): Promise<CityResult | null> => {
        if (!cityName.trim() || cityName.length < 2) {
            setError( 'veuillez saisir au moins 2 caractères');
            return null;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cityName)}&count=1&language=fr&format=json`);

            if (!response.ok) {
                throw new Error('Erreur lors de la recherche de la ville');
            }

            const data = await response.json();

            if (!data.results || data.results.length === 0) {
                setError(`Aucune ville trouvée pour "${cityName}"`);
                return null;
            }

            const city = data.result[0];
            return {
                name: city.name,
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
            };
        } catch {
            setError('Erreur lors de la recherche de la ville');
            return null;
        }
    };

    return {
        searchCity,
        isLoading,
        error,
        };
    }