import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ForecastHeaderProps {
    cityName: string;
    title?: string;
}

export default function ForecastHeader({
    cityName,
    title = "Prévisions sur 7 jours",
}: ForecastHeaderProps) {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.city}>{cityName}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        padding: 20,
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255,255,255,0.1)',
        marginBottom: 16,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    city: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.8)',
    },
});