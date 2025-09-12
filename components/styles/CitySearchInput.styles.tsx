import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
    flexDirection: 'row',
    width: '100%',
    marginBottom: 16,
    },
    input: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 25,
        paddingHorizontal: 20,
        paddingVertical: 12,
        fontSize: 16,
        color: 'white',
        marginRight: 8,
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    button: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonDisabled: {
        opacity: 0.5,
    },
    buttonText: {
        fontSize: 20,
    },
})