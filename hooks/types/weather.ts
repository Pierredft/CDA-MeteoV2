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
}

export interface Location {
    coords: {
        latitude: number;
        longitude: number;
    };
}

export interface FavoriteCity {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    addedAt: number;
}