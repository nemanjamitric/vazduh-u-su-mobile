import React, { useMemo } from 'react';
import { Dimensions, View } from 'react-native';
import { Card, Paragraph, Text } from 'react-native-paper';

import { getClosestKey } from '../functions/commonFunctions';
import { qualityColorVals50, qualityColorVals80, qualitySmiley, qualityText } from '../functions/meteoTransform';
import { AdditionalSensorData } from '../types/__generated__/graphql';

interface Props {
  airData: AdditionalSensorData;
}

const AirQualityCard: React.FC<Props> = ({ airData }) => {
  const renderQualityCard = useMemo(() => {
    if (!airData) return null;
    return (
      <Card
        style={{
          height: 140,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12,
          overflow: 'hidden',
        }}>
        <Card.Content
          style={{
            backgroundColor: getClosestKey(qualityColorVals50, Number(airData?.pm25_conc)),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', width: Dimensions.get('window').width - 170 }}>
            <Paragraph style={{ fontSize: 20, marginTop: 10 }}>
              Kvalitet vazduha: {getClosestKey(qualityText, Number(airData?.aqius))}{' '}
              {getClosestKey(qualitySmiley, Number(airData?.aqius))}
            </Paragraph>
          </View>
          <View
            style={{
              width: 120,
              backgroundColor: getClosestKey(qualityColorVals80, Number(airData?.aqius)),
              height: 120,
              borderRadius: 10,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16 }}>US AQI</Text>
            <Text style={{ fontSize: 60 }}>{airData?.aqius}</Text>
          </View>
        </Card.Content>
      </Card>
    );
  }, [airData]);

  return renderQualityCard;
};

export default AirQualityCard;
