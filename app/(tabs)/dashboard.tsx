import { useFocusEffect, useRouter } from 'expo-router';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Text, Title } from 'react-native-paper';

import { DataObject, MapDataQueryProps, WeatherData } from '../../interfaces/interfaces';
import AQICard from '../../components/AQICard';
import AirQualityCard from '../../components/AirQualityCard';
import Screen from '../../components/Screen';
import WeatherCard from '../../components/WeatherCard';
import { useLocationStore } from '../../stores/locationStore';
import { gql, useQuery } from '@apollo/client';
import { AdditionalSensorData } from '../../types/__generated__/graphql';

const LATEST_DATA = gql`
query GetLatestData {
  getLatestData {
    _id
    name
    pm25_conc
  }
}
`;

const Dashboard: FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const {data, loading, error} = useQuery<MapDataQueryProps>(LATEST_DATA);
  const selectedLocation = useLocationStore((state) => state.location);
  const router = useRouter();

  useFocusEffect(() => {
    if (!selectedLocation) {
      router.replace('/selectLocation');
    }
  });

  const airData = useMemo(() => {
    if (!data) return null;
    return data.getLatestData.find((data) => data.name === selectedLocation.name);
  }, [data, selectedLocation]);

  console.log(airData);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const data: WeatherData = await getWeather();
//         const aqiResult: DataObject = await getFavouriteDistrictData(selectedDistrict);

//         setWeatherData(data);
//         setAirData(aqiResult);
//       } catch (error) {
//         handleError(error);
//       }
//     };

//     fetchData();
//   }, [selectedDistrict]);

  return (
    <Screen>
      <Text variant="headlineLarge" style={{ marginBottom: 16 }}>
        Najvažnije informacije
      </Text>
      <Title style={styles.sectionTitle}>Kvalitet vazduha</Title>
      <AirQualityCard airData={airData} />
      <Title style={styles.sectionTitle}>Precizni podaci</Title>
      {/* <AQICard airData={airData} /> */}
      <Title style={styles.sectionTitle}>Trenutno vreme</Title>
      <WeatherCard weatherData={weatherData} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default Dashboard;
