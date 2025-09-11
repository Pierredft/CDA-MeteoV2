import React from "react";
import { ImageBackground } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/Container.styles";

interface ContainerProps {
    children: React.ReactNode;
    backgroundImage?: any;
}

export default function Container({ children, backgroundImage}: ContainerProps) {
    const content = (
        <SafeAreaView style={styles.container}>
            {children}
        </SafeAreaView>
    );

    if (backgroundImage) {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                {content}
            </ImageBackground>
        );
    }

    return content;
}