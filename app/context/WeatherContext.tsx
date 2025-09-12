// app/context/WeatherContext.tsx
import { FavoriteCity, Location, WeatherContextType, WeatherData } from '@/hooks/types/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, ReactNode, useContext, useState } from 'react';

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

const FAVORITES_KEY = '@weather_favorites';

export function WeatherProvider({ children }: { children: ReactNode }) {
    const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
    const [currentLocation, setcurrentLocation] = useState<Location | null>(null);
    const [cityName, setCityName] = useState<string>('Ma position');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<FavoriteCity[]>([]);

    // Logique des favoris
    const saveFavorites = async (newFavorites: FavoriteCity[]) => {
        try {
            await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
            setFavorites(newFavorites);
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des favoris:', error);
        }
    };

    const loadFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error);
        }
    };

    const addToFavorites = async (city: FavoriteCity) => {
        const exists = favorites.some(fav => 
            Math.abs(fav.latitude - city.latitude) < 0.01 &&
            Math.abs(fav.longitude - city.longitude) < 0.01
        );

        if (!exists) {
            const updated = [...favorites, city];
            await saveFavorites(updated);
        }
    };

    const removeFromFavorites = async () => {
        try {
            const stored = await AsyncStorage.getItem(FAVORITES_KEY);
            if (stored) {
                setFavorites(JSON.parse(stored));
            }
        } catch (error) {
            console.error('Erreur lors du chargement des favoris:', error);
        }
    };

    return (
        <WeatherContext.Provider value={{
            weatherData, setWeatherData,
            currentLocation, setcurrentLocation,
            cityName, setCityName,
            isLoading, setIsLoading,
            error, setError,
            favorites,
            addToFavorites,
            removeFromFavorites,
            loadFavorites,
        }}>
            {children}
        </WeatherContext.Provider>
    );
}

export const useWeather = () => {
    const context = useContext(WeatherContext);
    if (!context) {
        throw new Error('useWeather must be used within WeatherProvider');
    }
    return context;
};