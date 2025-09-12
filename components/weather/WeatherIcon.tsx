import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface WeatherIconProps {
    weatherCode: number;
    size?: 'small' | 'medium' | 'large';
}

const getweatherIcon = (code: number): string => {
    const weatherIcons: { [key: number]: string } = {
        0: '☀️',
        1: '🌤️',
        2: '⛅',
        3: '☁️',
        45: '🌫️',
        48: '🌫️',
        51: '🌦️',
        53: '🌦️',
        55: '🌧️',
        61: '🌦️',
        63: '🌧️',
        65: '⛈️',
        71: '🌨️',
        73: '❄️',
        75: '❄️',
        95: '⛈️'
    };
    return weatherIcons[code] || '🌤️';
};

export default function WeatherIcon({ weatherCode, size = 'large' }: WeatherIconProps) {
    return (
        <Text style={[styles.icon, styles[size]]}>
            {getweatherIcon(weatherCode)}
        </Text>
    );
}

const styles = StyleSheet.create({
    icon: {
        textAlign: 'center',
    },
    small: {
        fontSize: 24,
    },
    medium: {
        fontSize: 48,
    },
    large: {
        fontSize: 64,
    },
});