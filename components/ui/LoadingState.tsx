import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

interface LoadingStateProps {
    message?: string;
}

export default function LoadingState({ message = "Chargement..."}: LoadingStateProps){
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#ffffff" />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text : {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 12,
    }
})