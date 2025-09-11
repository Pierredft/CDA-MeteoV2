import React from 'react';
import { Text, View } from 'react-native';
import { styles } from '../styles/TemperatureDisplay.styles';

interface TemperatureDisplayProps {
    temperature: number;
    city: string;
}

export default function TemperatureDisplay({ temperature, city }: TemperatureDisplayProps){
    return (
        <View style={styles.container}>
            <Text style={styles.city}>{city}</Text>
            <Text style={styles.temperature}>{temperature}°C</Text>
        </View>
    );
}