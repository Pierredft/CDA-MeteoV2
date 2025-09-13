import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    button: {
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    disabled: {
        opacity: 0.5,
    },
    inFavorites: {
        backgroundColor: 'rgba(255,215,0,0.3)',
        borderColor: 'rgba(255,215,0,0.5)',
    },
    icon: {
        fontSize: 16,
        marginRight: 6,
        color: 'white',
    },
    text: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
    },
});