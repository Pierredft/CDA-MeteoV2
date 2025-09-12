import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
    },
})