import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/LocationButton.styles';

interface LocationButtonProps {
    onPress: () => void;
    isLoading?: boolean;
    text?: string;
}

export default function LocationButton({
    onPress,
    isLoading = false,
    text = '📍 Ma postition',
}: LocationButtonProps) {
    return (
        <TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={onPress} disabled={isLoading}>
            <Text style={styles.text}>{text}</Text>
        </TouchableOpacity>
    );
}