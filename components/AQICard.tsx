import { useRouter } from 'expo-router';
import moment from 'moment';
import React, { useCallback, useMemo } from 'react';
import { View } from 'react-native';
import { Avatar, Card, Paragraph, Text } from 'react-native-paper';

import { AdditionalSensorData } from '../types/__generated__/graphql';

interface Props {
  airData: AdditionalSensorData;
}

const AQICard: React.FC<Props> = ({ airData }) => {
  const router = useRouter();
  const handleNavigation = useCallback(() => {
    router.replace(`device/${airData.name}`);
  }, [airData?.name, router]);

  const renderIcon = useMemo(() => {
    if (!airData) return null;
    return (
      <View>
        {airData ? (
          <Card style={{ marginBottom: 12 }} onPress={handleNavigation}>
            <Card.Title
              title={'Uređaj: ' + airData.name}
              left={props => <Avatar.Icon {...props} icon="map-marker-star" />}
            />
            <Card.Content>
              <Paragraph>Vazdušni pritisak: {Math.round(Number(airData.pressure) / 100)} mbar</Paragraph>
              <Paragraph>Vlažnost vazduha: {airData.humidity}%</Paragraph>
              <Paragraph>Temperatura: {airData.temperature}°C</Paragraph>
              <Paragraph>AQI ocena (indeks kvaliteta vazduha): {airData.pm25_aqius}</Paragraph>
              <Paragraph>Koncentracija čestica (PM2.5): {airData.pm25_conc} µg/m³</Paragraph>
              <Paragraph>Vreme uzorkovanja: {moment(airData.time).format('h:mm:ss D.M.YYYY.')}</Paragraph>
            </Card.Content>
          </Card>
        ) : (
          <Text>No data available.</Text>
        )}
      </View>
    );
  }, [airData, handleNavigation]);
  return renderIcon;
};

export default AQICard;
