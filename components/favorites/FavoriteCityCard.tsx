import { styles } from "@/components/styles/FavoriteCityCard.styles";
import { FavoriteCity } from "@/hooks/types/weather";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface FavoriteCityCardProps {
    city: FavoriteCity;
    onPress: (city: FavoriteCity) => void;
    onRemove: (city: FavoriteCity) => void;
    showWeather?: boolean;
    temperature? : number;
}

export default function FavoriteCityCard({
    city,
    onPress,
    onRemove,
    showWeather = false,
    temperature
}: FavoriteCityCardProps) {
    const formatDate = (date: string | number) => {
        return new Date(date).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity
                style={styles.content}
                onPress={() => onPress(city)}
            >
                <View style={styles.header}>
                    <Text style={styles.cityName}>{city.name}</Text>
                    {showWeather && temperature && (
                        <Text style={styles.temperature}>{Math.round(temperature)}°C</Text>
                    )}
                </View>

                <View style={styles.details}>
                    <Text style={styles.coordinates}>
                        {city.latitude.toFixed(2)}°, {city.longitude.toFixed(2)}°
                    </Text>
                    <Text style={styles.date}>
                        Ajouté le {formatDate(city.addedAt)}
                    </Text>
                </View>
            </TouchableOpacity>

            <TouchableOpacity 
            style={styles.removeButton}
            onPress={() => onRemove(city)} 
            >
                <Text style={styles.removeText}>Supprimer</Text>
            </TouchableOpacity>
        </View>
    );
}