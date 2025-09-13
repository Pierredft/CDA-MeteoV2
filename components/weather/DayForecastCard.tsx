import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/DayForecastCard.styles';
import WeatherIcon from './WeatherIcon';

interface DayForecastCardProps {
    date: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
}

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()) {
        return 'Ajourd\'hui';
    } else if (date.toDateString() === tomorrow.toDateString()) {
        return 'Demain';
    } else {
        return date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
        });
    }
};

export default function DayForecastCard({
    date,
    weatherCode,
    tempMax,
    tempMin,
}: DayForecastCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.date}>{formatDate(date)}</Text>

            <View style={styles.weather}>
                <WeatherIcon weatherCode={weatherCode} size='medium' />
            </View>

            <View style={styles.temperatures}>
                <Text style={styles.tempMax}>Max: {Math.round(tempMax)}°C</Text>
                <Text style={styles.tempMin}>Min: {Math.round(tempMin)}°C</Text>
            </View>
        </View>
    );
}