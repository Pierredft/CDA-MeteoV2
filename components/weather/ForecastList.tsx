import React from "react";
import { FlatList, ListRenderItem, StyleSheet } from "react-native";
import DayForecastCard from "./DayForecastCard";

interface ForecastItem {
    id: string;
    date: string;
    weatherCode: number;
    tempMax: number;
    tempMin: number;
}

interface ForecastListProps {
    forecastData: ForecastItem[];
}

export default function ForecastList({ forecastData }: ForecastListProps) {
    const renderItem: ListRenderItem<ForecastItem> = ({ item }) => (
        <DayForecastCard
            date={item.date}
            weatherCode={item.weatherCode}
            tempMax={item.tempMax}
            tempMin={item.tempMin}
        />
    );

    return (
        <FlatList
            data={forecastData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            style={styles.list}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
        />
    );
}
    const styles = StyleSheet.create({
    list: {
        flex: 1,
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
});
