import React from 'react';
import { StyleSheet, Text } from 'react-native';

interface WeatherDescriptionProps {
    weatherCode : number;
    style?: any;
}

const getWeatherDescription = (code:number) : string => {
    const weatherCodes: { [key: number]: string} = {
        0: "Ciel dégagé",
        1: "Principalement dégagé",
        2: "Partiellement nuageux",
        3: "Couvert",
        45: "Brouillard",
        48: "Brouillard givrant",
        51: "Bruine légère",
        53: "Bruine modérée",
        55: "Bruine dense",
        61: "Pluie légère",
        63: "Pluie modérée",
        65: "Pluie forte",
        71: "Neige légère",
        73: "Neige modérée",
        75: "Neige forte",
        95: "Orage"
    };
    return weatherCodes[code] || "Conditions inconnues";
};

export default function WeatherDescription({ weatherCode, style}: WeatherDescriptionProps) {
    return (
        <Text style={[styles.description, style]}>
            {getWeatherDescription(weatherCode)}
        </Text>
    );
}

const styles = StyleSheet.create({
    description: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.9)',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});