import FavoriteCityCard from "@/components/favorites/FavoriteCityCard";
import { styles } from "@/components/styles/Favorites.styles";
import Container from "@/components/ui/Container";
import { useWeather } from "@/context/WeatherContext";
import { FavoriteCity } from "@/hooks/types/weather";
import { useFavorites } from "@/hooks/useFavorites";
import React, { useEffect } from "react";
import { FlatList, ListRenderItem, Text, View } from "react-native";

const fond = require('../../assets/images/fondFav.jpg');

export default function FavoritesScreen() {
    const {
        setWeatherData,
        setCityName,
        setcurrentLocation,
        setIsLoading,
        setError
    } = useWeather();

    const { favorites, removeFavorite, loadFavorites } = useFavorites();

    useEffect(() => {
        loadFavorites();
    }, [loadFavorites]);

    const handleCityPress = async (city: FavoriteCity) => {
        setIsLoading(true);
        setError(null);
        setCityName(city.name);
        setcurrentLocation({ latitude: city.latitude, longitude: city.longitude });

        try {
            const response = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${city.latitude}&longitude=${city.longitude}&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min&hourly=relative_humidity_2m&timezone=auto&forecast_days=7`
            );

            if (!response.ok) {
                throw new Error(`Erreur API: ${response.status}`);
            }

            const data = await response.json();
            setWeatherData(data);
        } catch {
            setError('Impossible de récupérer la météo pour cette ville.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemove = async (city: FavoriteCity) => {
        await removeFavorite(city.id);
    };

    const renderItem: ListRenderItem<FavoriteCity> = ({item}) => (
        <FavoriteCityCard 
            city={item}
            onPress={handleCityPress}
            onRemove={handleRemove}
        />
    );

    const EmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>⭐️</Text>
            <Text style={styles.emptyTitle}>Aucune ville en favorite</Text>
            <Text style={styles.emptyText}>
                Ajoutez vos villes préférées depuis l&apos;onglet Météo pour un accès rapide
            </Text>
        </View>
    );

    return (
        <Container backgroundImage={fond}>
            <View style={styles.header}>
                <Text style={styles.title}>Mes villes favorites</Text>
                <Text style={styles.subtitle}>{favorites.length} ville(s) en favorite</Text>
            </View>

            {favorites.length === 0 ? (
                <EmptyState />
            ) : (
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    style={styles.list}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </Container>
    )
}