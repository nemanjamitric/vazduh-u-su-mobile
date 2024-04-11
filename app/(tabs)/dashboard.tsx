import { useFocusEffect, useRouter } from 'expo-router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { Dimensions, Image, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Icon, Text, Title } from 'react-native-paper';

import { MapDataQueryProps } from '../../interfaces/interfaces';
import * as Location from 'expo-location';
import { gql, useQuery } from '@apollo/client';
import QueryResult from '../../components/QueryResult';
import useTheme from '../../hooks/useTheme';
import { findClosestLocation, getClosestKey } from '../../functions/commonFunctions';
import { qualityColorVals80, qualityText } from '../../functions/meteoTransform';
import DashboardCard from '../../components/DashboardCard';
import WindArrow from '../../components/WindArrow';
import SuggestionCard from '../../components/SuggestionCard';
import BackgroundImage from '../../components/BackgroundImage';

const {width, height} = Dimensions.get('window');

const LATEST_DATA = gql`
query GetLatestData {
  getLatestData {
    _id
    name
    displayName
    displayNameLatin
    path
    region
    contributor
    time
    aqicn
    aqius
    pm10_aqicn
    pm10_aqius
    pm10_conc
    pm1_aqicn
    pm1_aqius
    pm1_conc
    pm25_aqicn
    pm25_aqius
    pm25_conc
    condition
    latitude
    longitude
    humidity
    pressure
    temperature
    wind_direction
    wind_speed
  }
}
`;

const Dashboard: FC = () => {
  const {data, loading, error, refetch} = useQuery<MapDataQueryProps>(LATEST_DATA);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const airData = useMemo(() => {
    if (!data?.getLatestData?.[0]?.name || !location) return null;
    return findClosestLocation(location, data.getLatestData);
  }, [data]);

  const colorDeterminer = Number(airData?.aqius);

  return (
    <View style={{flex: 1}}>
      <QueryResult loading={loading} error={error} data={data}>
        <BackgroundImage pictureParameter={getClosestKey(qualityText, colorDeterminer)}/>
        <ScrollView
        style={{padding: Dimensions.get('window').width / 36}}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refetch} colors={[colors.primary]} />
        }>
          <View style={styles.topContainer}>
            <DashboardCard
              style={{
                width: 200,
                backgroundColor: getClosestKey(qualityColorVals80, colorDeterminer),
                height: 200,
                borderRadius: 16,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
            }} 
            colorParameter={colorDeterminer}>
              <Text style={{ fontSize: 30, fontFamily: 'Light', letterSpacing: -3,  bottom: -30 }}>US AQI</Text>
              <Text style={{ fontSize: 120, fontFamily: 'Light', letterSpacing: -3 }}>{airData?.aqius}</Text>
              </DashboardCard>
          </View>
          <View style={styles.firstRow}>
            <DashboardCard colorParameter={colorDeterminer} style={styles.firstRowCard}>
              <Icon size={30} source='thermometer' />
              <Title style={styles.cardText}>{airData?.temperature}° C</Title>
            </DashboardCard>
            <DashboardCard colorParameter={colorDeterminer} style={styles.firstRowCard}>
              <Icon size={30} source='cloud' />
              <Title style={styles.cardText}>{airData?.condition}</Title>
            </DashboardCard>
            <DashboardCard colorParameter={colorDeterminer} style={styles.firstRowCard}>
              <WindArrow direction={airData?.wind_direction} />
              <Title style={styles.cardText}>{airData?.wind_direction} km/h</Title>
            </DashboardCard>
          </View>
          <DashboardCard colorParameter={colorDeterminer}>
            <Title style={styles.cardTitle}>Podaci sa Vama najbliže lokacije:</Title>
            <Text style={styles.cardText}>{airData?.region} ({airData?.displayName})</Text>
          </DashboardCard>
          <View style={styles.twoColumnRow}>
              <DashboardCard style={styles.halfItem} colorParameter={colorDeterminer}>
                <Title style={styles.cardTitle}>Vazduh:</Title>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <Icon size={20} source='water' />
                    <Text style={styles.cardText}>Vlažnost:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.humidity}%</Text>
                </View>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <Icon size={20} source='thermostat' />
                    <Text style={styles.cardText}>Pritisak:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.pressure}</Text>
                </View>
              </DashboardCard>
              <DashboardCard style={styles.halfItem} colorParameter={colorDeterminer}>
                <Title style={styles.cardTitle}>Vetar:</Title>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <Icon size={20} source='weather-windy' />
                    <Text style={styles.cardText}>Brzina:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.wind_speed}</Text>
                </View>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <Icon size={20} source='weather-windy' />
                    <Text style={styles.cardText}>Pravac:</Text>
                  </View>
                  <WindArrow direction={airData?.wind_direction} />
                </View>
              </DashboardCard>
            </View>
              <DashboardCard colorParameter={colorDeterminer}>
                <Title style={styles.cardTitle}>Čestice:</Title>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <View style={styles.iconContainer}>
                      <Icon size={16} source='atom' />
                    </View>
                    <Text style={styles.cardText}>Čestice veličine 1μm:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.pm1_conc} μg/m3</Text>
                </View>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <View style={styles.iconContainer}>
                      <Icon size={20} source='atom' />
                    </View>
                    <Text style={styles.cardText}>Čestice veličine 2.5μm:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.pm25_conc} μg/m3</Text>
                </View>
                <View style={styles.cardTextWithIcon}>
                  <View style={styles.iconText}>
                    <View style={styles.iconContainer}>
                      <Icon size={24} source='atom' />
                    </View>
                    <Text style={styles.cardText}>Čestice veličine 10μm:</Text>
                  </View>
                  <Text style={styles.cardText}>{airData?.pm10_conc} μg/m3</Text>
                </View>
              </DashboardCard>
              <SuggestionCard colorParameter={colorDeterminer} title={getClosestKey(qualityText, colorDeterminer)} />
              <View style={{ height: 100 }} />
        </ScrollView>
      </QueryResult>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    height: 24,
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  cardTextWithIcon: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  twoColumnRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  halfItem: {
    width: '48.5%',
  },
  topContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center'
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Bold',
    marginTop: 16,
  },
  cardTitle: {
    fontSize: 18,
    lineHeight: 20,
    fontFamily: 'Medium',
  },
  cardText: {
    fontSize: 16,
    fontFamily: 'Regular'
  },
  cardTextLight: {
    fontSize: 16,
    fontFamily: 'Light',
    marginBottom: 16
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  firstRowCard: {
    width: '30%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Dashboard;
