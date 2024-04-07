import { gql, useQuery } from "@apollo/client";
import React, { useMemo, useState } from "react";
import { SegmentedButtons, Text, useTheme } from "react-native-paper";
import QueryResult from "../../components/QueryResult";
import MapView, { Circle, Marker, Region } from "react-native-maps";
import { ColorSchemeName, Dimensions, FlatList, StyleSheet, View, useColorScheme } from "react-native";
import { BlurView } from "expo-blur";
import * as Location from 'expo-location';
import { getClosestKey } from "../../functions/commonFunctions";
import { qualityColorVals, qualityColorVals80 } from "../../functions/meteoTransform";
import Screen from "../../components/Screen";
import AQICard from "../../components/AQICard";
import { MapDataQueryProps } from "../../interfaces/interfaces";

const MAP_DATA = gql`
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
    sumporDioksid
    ugljenMonogksid
    benzen
    toulen
    etilBenzen
    mpKsilen
    oKsilen
    prizemniOzon
    azotDioksid
    azotMonogksid
    oksidiAzota
  }
}
`


const mapCustomStyle = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#263c3f' }] },
    { featureType: 'poi.park', elementType: 'labels.text.fill', stylers: [{ color: '#6b9a76' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    { featureType: 'transit', elementType: 'geometry', stylers: [{ color: '#2f3948' }] },
    { featureType: 'transit.station', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
  ];

  const mapStyle=
  [
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    }
  ]

  const legend = [
    { text: 'Dobar', color: '#9CD84E' },
    { text: 'Prihvatljiv', color: '#FACF39' },
    { text: 'Srednji', color: '#F99049' },
    { text: 'Loš', color: '#F65E5F' },
    { text: 'Veoma loš', color: '#A070B6' },
    { text: 'Izuzetno loš', color: '#A06A7B' },
  ];

const Map = () => {
    const {loading, error, data} = useQuery<MapDataQueryProps>(MAP_DATA);
    const [dataViewSelected, setDataViewSelected] = useState<boolean>(false);
    const [mapRegion, setMapRegion] = useState<Region | undefined>({
      latitude: 46.099435,
      longitude: 19.670468,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const colorScheme: ColorSchemeName = useColorScheme();
    const { colors } = useTheme();

    const renderDataView = useMemo(() => {
        if (!data?.getLatestData) {
          return null
        }
        return (
          <Screen withoutScrollView>
            <FlatList
              contentContainerStyle={{ paddingTop: 70 }}
              data={data.getLatestData}
              renderItem={({ item }) => <AQICard airData={item} />}
              keyExtractor={item => item._id}
            />
          </Screen>
        );
      }, [loading, data]);

      

      const renderChart = useMemo(() => {
        return legend.map(item => (
          <View
            key={item.text}
            style={{
              width: (Dimensions.get('window').width * 0.96) / 6,
              backgroundColor: item.color,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 1,
              borderColor: '#b0b0b0',
            }}>
            <Text style={{ color: '#000', textAlign: 'center', fontSize: Dimensions.get('window').width * 0.025 }}>
              {item.text}
            </Text>
          </View>
        ));
      }, []);
    
    const renderSUAirMap = useMemo(() => {
        return (
          <>
            <MapView
              style={{ flex: 1 }}
              initialRegion={{
                latitude: 46.099435,
                longitude: 19.670468,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              showsPointsOfInterest={false}
              customMapStyle={colorScheme === 'dark' ? {...mapStyle, ...mapCustomStyle} : mapStyle}
              region={mapRegion}
              provider="google">
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                  }}
                  title="Vaša lokacija"
                  pinColor={colors.primary}
                />
              )}
              {data?.getLatestData?.map((point) => {
                return (
                  <View key={point._id}>
                    <Circle
                      key={'smallCircle' + point._id}
                      center={{
                        latitude: Number(point.latitude),
                        longitude: Number(point.longitude),
                      }}
                      radius={200}
                      strokeWidth={0}
                      fillColor={getClosestKey(qualityColorVals80, Number(point.pm25_conc))}
                    />
                    <Circle
                      key={'largeCircle' + point._id}
                      center={{
                        latitude: Number(point.latitude),
                        longitude: Number(point.longitude),
                      }}
                      radius={500}
                      strokeWidth={0}
                      fillColor={getClosestKey(qualityColorVals, Number(point.pm25_conc))}
                    />
                    <Marker
                        key={'marker' + point._id}
                        coordinate={{
                            latitude: Number(point.latitude),
                            longitude: Number(point.longitude),
                        }}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text>{Math.round(Number(point.pm25_conc))}</Text>
                        </View>
                    </Marker>
                  </View>
                )
              })}
            </MapView>
            <View
              style={{
                position: 'absolute',
                bottom: 30,
                flexDirection: 'row',
                right: Dimensions.get('window').width * 0.02,
                width: Dimensions.get('window').width * 0.96,
                height: 60,
                borderRadius: 60,
                borderWidth: 1,
                borderColor: '#b0b0b0',
                overflow: 'hidden',
              }}>
              {renderChart}
            </View>
            <View
              style={{
                position: 'absolute',
                top: 80,
                right: 20,
              }}>
              {/* <SelectedDistrictCard size="small" /> */}
            </View>
          </>
        );
      }, [colorScheme, mapRegion, location, colors.primary, data, renderChart]);
    
      const renderContent = useMemo(() => {
        if (dataViewSelected) {
          return renderDataView;
        }
        return renderSUAirMap;
      }, [dataViewSelected, renderSUAirMap, renderDataView]);
    
      return (
        <QueryResult loading={loading} error={error} data={data}>
        <View style={{ flex: 1 }}>
          <BlurView style={styles.buttonContainer} intensity={100} tint={colorScheme}>
            <SegmentedButtons
              value={JSON.stringify(dataViewSelected)}
              onValueChange={value => {
                if (typeof value === 'string') {
                  setDataViewSelected(JSON.parse(value));
                }
              }}
              buttons={[
                {
                  value: 'false',
                  label: 'Mapa',
                },
                {
                  value: 'true',
                  label: 'Detalji',
                },
              ]}
            />
          </BlurView>
          {renderContent}
        </View>
        </QueryResult>
      );
}

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    top: 0,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    overflow: 'hidden',
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9998,
  },
});

export default Map