import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles/CitySearchInput.styles";

interface CitySearchInputProps {
    value: string;
    onValueChange: (text: string) => void;
    onSearch: () => void;
    isLoading?: boolean;
    placeholder?: string; // nous ajoutons un ? pour indiquer que c'est optionnel
}

export default function CitySearchInput({
    value,
    onValueChange,
    onSearch,
    isLoading = false,
    placeholder = "Entrez une ville"
}: CitySearchInputProps) {
    return (
        <View style={styles.container}>
            <TextInput 
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={"rgba(255,255,255,0.6)"}
                value={value}
                onChangeText={onValueChange}
                onSubmitEditing={onSearch}
                returnKeyType="search"
                autoCapitalize="words"
                autoCorrect={false}
                editable={!isLoading}
            />
            <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={onSearch} disabled={isLoading}>
                <Text style={styles.buttonText}>🔍</Text>
            </TouchableOpacity>
        </View>
    );
}