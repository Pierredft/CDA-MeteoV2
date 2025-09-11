import React from 'react';
import { StyleSheet, View } from 'react-native';

interface SectionProps {
    children: React.ReactNode;
    flex?: number;
    style?: any;
}

export default function Section({ children, flex=1, style}: SectionProps) {
    return (
        <View style={[styles.section, {flex}, style]}>{children}</View>
    );
}

const styles = StyleSheet.create({
    section: {
        padding: 16,
    },
});