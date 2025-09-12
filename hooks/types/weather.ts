export interface WeatherData {
    current_weather: {
        temperature: number;
        weathercode: number;
        windspeed: number;
        winddirection: number;
    };
    daily?: {
        time: string[];
        weathercode: number[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
    };
    hourly?: {
        relative_humidity_2m: number[];
    };
}

export interface Location {
        latitude: number;
        longitude: number;
}

export interface FavoriteCity {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    addedAt: number;
}

export interface WeatherContextType {
    // État météo
    weatherData: WeatherData | null;
    setWeatherData: (data: WeatherData | null) => void;

    // Localisation
    currentLocation: Location | null;
    setcurrentLocation: (location: Location | null) => void;
    cityName: string;
    setCityName: (name: string) => void;

    // État UI
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;

    //  Favoris
    favorites: FavoriteCity[];
    addToFavorites: (city: FavoriteCity) => Promise<void>;
    removeFromFavorites: (cityId: string) => Promise<void>;
    loadFavorites: () => Promise<void>;
}