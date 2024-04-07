import React from 'react';
import { FlatList, View } from 'react-native';
import { Card, IconButton, Text, useTheme } from 'react-native-paper';

import { MapDataQueryProps } from '../../interfaces/interfaces';
import { gql, useQuery } from '@apollo/client';
import { AdditionalSensorData } from '../../types/__generated__/graphql';
import { useLocationStore } from '../../stores/locationStore';
import QueryResult from '../../components/QueryResult';

const SELECT_LOCATION_DATA = gql`
query GetLatestData {
  getLatestData {
    _id
    name
    displayName
    displayNameLatin
    path
    region
    contributor
    latitude
    longitude
  }
}
`

const SelectLocation: React.FC = () => {
    const {loading, error, data} = useQuery<MapDataQueryProps>(SELECT_LOCATION_DATA);
    const locations = data?.getLatestData;
    const { colors } = useTheme();
    const {location: selectedDistrict, setLocation, removeLocation} = useLocationStore();

    const handleSelectDistrict = (newLocation: AdditionalSensorData) => {
        if (newLocation._id === selectedDistrict?._id) {
            removeLocation();
            return;
        }
        setLocation(newLocation);
    };

    const renderDistrictCard = ({ item }: { item: AdditionalSensorData }) => (
        <Card
            style={{
                margin: 10,
                overflow: 'hidden',
                borderColor: colors.primary,
                borderWidth: item._id === selectedDistrict?._id ? 2 : 0,
            }}
            onPress={() => {
                handleSelectDistrict(item);
            }}>
            <Card.Cover source={require('../../assets/subotica.jpg')} />
            <Card.Title
                title={item.name}
                right={props => {
                    if (item._id === selectedDistrict?._id) {
                        return <IconButton mode="contained" {...props} icon="check-bold" onPress={() => {}} />;
                    }
                    return null;
                }}
            />
        </Card>
    );

    return (
        <QueryResult loading={loading} error={error} data={data}>
            <View style={{ flex: 1, backgroundColor: colors.background, padding: 12 }}>
                <FlatList
                data={locations}
                keyExtractor={item => item._id}
                renderItem={renderDistrictCard}
                style={{ flex: 1 }}
                ListHeaderComponent={<Text variant="headlineLarge">Izaberite lokaciju</Text>}
                ListEmptyComponent={() => (
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text variant="headlineLarge">Učitavanje...</Text>
                    </View>
                )}
                />
            </View>
        </QueryResult>
    );
};

export default SelectLocation;
