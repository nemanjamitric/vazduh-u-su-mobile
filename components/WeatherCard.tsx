import { useRouter } from 'expo-router';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Avatar, Card, Paragraph } from 'react-native-paper';

import WeatherIcon from './WeatherIcon';
import { weatherIconNow } from '../functions/commonFunctions';
import { weatherMap } from '../functions/meteoTransform';
import { WeatherData } from '../interfaces/interfaces';

interface Props {
  weatherData: WeatherData;
}

const WeatherCard: React.FC<Props> = ({ weatherData }) => {
  const router = useRouter();

  const navigationHandler = useCallback(() => {
    router.replace('/weather');
  }, [router]);

  const renderIcon = useMemo(() => {
    if (!weatherData) return <View />;
    return (
      <Card
        onPress={navigationHandler}
        style={{
          marginBottom: 12,
        }}>
        <Card.Title title={'Vreme u Subotici'} left={props => <Avatar.Icon {...props} icon="weather-cloudy" />} />
        <Card.Content>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
              <Paragraph>Temperatura: {weatherData.current_weather.temperature}°C</Paragraph>
              <Paragraph>Brzina vetra: {weatherData.current_weather.windspeed} km/h</Paragraph>
              <Paragraph>
                Opis vremena:{' '}
                {weatherMap.get(weatherData?.current_weather ? weatherData.current_weather.weathercode : 0)}
              </Paragraph>
            </View>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <WeatherIcon size="large" code={weatherIconNow(weatherData)} />
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  }, [navigationHandler, weatherData]);
  return renderIcon;
};

export default WeatherCard;
