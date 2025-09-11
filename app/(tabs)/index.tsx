import Container from '@/components/ui/Container';
import LoadingState from '@/components/ui/LoadingState';
import Section from '@/components/ui/Section';
import TemperatureDisplay from '@/components/weather/TemperatureDisplay';
import React from 'react';

const fond = require('../../assets/images/fond.jpg');

export default function HomeScreen() {
  // États temporaires pour la démonstration
  const [isLoading, setIsLoading] = React.useState(false);
  const [weatherData, setWeatherData] = React.useState({
    temperature: 22,
    city: "Ma position"
  });

  return (
    <Container backgroundImage={fond}>
      <Section style={{ flex: 2 }}>
        {isLoading ? (
          <LoadingState message="Récupération météo..." />
        ) : (
          <TemperatureDisplay temperature={weatherData.temperature} city={weatherData.city} />
        )}
      </Section>

      <Section style={{ flex: 2 }}>
        {/* Espace pour la recherche */}
        <></>
      </Section>
      <Section style={{ flex: 1 }}>
        {/* Espace pour les prévisions */}
        <></>
      </Section>
    </Container>
  )
}