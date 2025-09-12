import { useGeocode } from '@/hooks/useGeocode';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LocationResult, useLocation } from '../../hooks/useLocation';
import CitySearchInput from '../forms/CitySearchInput';
import LocationButton from '../forms/LocationButton';

interface SearchSectionProps {
    onLocationFound: (location: LocationResult, cityName:string) => void;
    onError: (error:string) => void;
}

export default function SearchSection({ onLocationFound, onError }: SearchSectionProps) {
    const [searchText, setSearchText] = useState('');
    const {getCurrentLocation, isLoading: locationLoading} = useLocation();
    const { searchCity, isLoading: searchLoading } = useGeocode();

    const isLoading = locationLoading || searchLoading;

    const handleSearch = async () => {
        const cityResult = await searchCity(searchText);
        if (cityResult) {
            const location: LocationResult = {
                latitude: cityResult.latitude,
                longitude: cityResult.longitude,
            };
            onLocationFound(location, `${cityResult.name}, ${cityResult.country}`);
            setSearchText('');
        }
    };

    const handleLocationPress = async () => {
        const location = await getCurrentLocation();
        if (location) {
            onLocationFound(location, 'Ma position');
        }
    };

    return (
        <View style={styles.container}>
            <CitySearchInput
                value={searchText}
                onValueChange={setSearchText}
                onSearch={handleSearch}
                isLoading={isLoading}
            />

            <LocationButton onPress={handleLocationPress} isLoading={locationLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});