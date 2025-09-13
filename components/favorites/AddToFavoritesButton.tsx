import { styles } from "@/components/styles/FavoritesButton";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface AddToFavoritesButtonProps {
    onPress: () => void;
    isDisabled?: boolean;
    isInFavorites?: boolean;
}

export default function AddToFavoritesButton({
    onPress,
    isDisabled = false,
    isInFavorites = false,
}: AddToFavoritesButtonProps) {
    return (
        <TouchableOpacity
            style={[styles.button, isDisabled && styles.disabled, isInFavorites && styles.inFavorites]}
            onPress={onPress}
            disabled={isDisabled}
        >
            <Text style={styles.icon}>
                {isInFavorites ? '★' : '☆'}
            </Text>
            <Text style={styles.text}>
                {isInFavorites ? 'En favoris' : 'Ajouter aux favoris'}
            </Text>
        </TouchableOpacity>
);
}