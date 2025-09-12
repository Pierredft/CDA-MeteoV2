import * as Location from 'expo-location';
import { useState } from 'react';

export interface LocationResult {
    latitude: number;
    longitude: number;
}

export function useLocation() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getCurrentLocation = async (): Promise<LocationResult | null> => {
        setIsLoading(true);
        setError(null);

        try {
            const { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted') {
                setError('Permission de géolocalisation refusée');
                return null;
            }

            const location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.Balanced,
            });

            return {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        } catch (err) {
            setError('Erreur lors de la géolocalisation');
            return null;
        } finally {
            setIsLoading(false);
        }
        };
    
        return {
            getCurrentLocation,
            isLoading,
            error,
        };
    }