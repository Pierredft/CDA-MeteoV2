import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        padding: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    date: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        marginBottom: 12,
        textAlign: 'center',
    },
    weather: {
        alignItems: 'center',
        marginBottom: 16,
    },
    temperatures: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    tempMax: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    tempMin: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.7)',
    },
});