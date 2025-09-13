import { useWeather } from '@/context/WeatherContext';
import { FavoriteCity } from '@/hooks/types/weather';
import { useCallback } from 'react';

export function useFavorites() {
    const {
        favorites,
        addToFavorites,
        removeFromFavorites,
        loadFavorites,
        currentLocation,
        cityName,
        setError
    } = useWeather();

    const handleAddCurrentLocation = useCallback(async () => {
        if (!currentLocation || !cityName) {
            setError('Aucune ville sélectionnée');
            return false;
        }

        // Vérifier si déjà en favoris
        const exists = favorites.some(city => 
            Math.abs(city.latitude - currentLocation.latitude) < 0.01 &&
            Math.abs(city.longitude - currentLocation.longitude) < 0.01
        );

        if (exists) {
            setError('Cette ville est déjà dans vos favoris');
            return false;
        }

        const newFavorite: FavoriteCity = {
            id: Date.now().toString(),
            name: cityName,
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
            addedAt: Date.now(),
        };

        try {
            await addToFavorites(newFavorite);
            setError('Ville ajoutée aux favoris');
            setTimeout(() => setError(null), 2000);
            return true;
        } catch {
            setError('Impossible d\'ajouter aux favoris');
            return false;
        }
    }, [currentLocation, cityName, favorites, addToFavorites, setError]);

    const handleRemoveFavorite = useCallback(async (cityId: string) => {
        try {
            await removeFromFavorites(cityId);
            return true;
        } catch {
            setError('Impossible de supprimer le favori');
            return false;
        }
    }, [removeFromFavorites, setError]);

    const isCurrentLocationInFavorites = useCallback(() => {
        if (!currentLocation) return false;

        return favorites.some(city =>
            Math.abs(city.latitude - currentLocation.latitude) <0.01 &&
            Math.abs(city.longitude - currentLocation.longitude) <0.01
        );
    }, [currentLocation, favorites]);

    return {
        favorites,
        addCurrentLocation: handleAddCurrentLocation,
        removeFavorite: handleRemoveFavorite,
        loadFavorites,
        isCurrentLocationInFavorites: isCurrentLocationInFavorites(),
    };
}