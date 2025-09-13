import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    card: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: 16,
        marginBottom: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.2)',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    cityName: {
        fontSize: 18,
        fontWeight: '600',
        color: 'white',
        flex: 1,
    },
    temperature: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
    },
    details: {
        gap: 4,
    },
    coordinates: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.7)',
    },
    date: {
        fontSize: 12,
        color: 'rgba(255,255,255,0.6)',
        fontStyle: 'italic',
    },
    removeButton: {
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    removeText: {
        fontSize: 18,
        color: 'rgba(255,0,0,0.8)',
        fontWeight: 'bold',
    },
});