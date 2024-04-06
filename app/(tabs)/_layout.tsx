import React from 'react';
import { Tabs } from 'expo-router';
import { Avatar } from 'react-native-paper';

import useTheme from '../../hooks/useTheme';
import NavigationHeader from '../../components/NavigationHeader';

const listOfHiddenButtonScreens: string[] = ['profile', 'selectLocation', 'device/[deviceName]'];
const listOfHiddenProfileButtonScreens: string[] = ['profile', 'selectLocation'];

const TabNav = (): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarButton: listOfHiddenButtonScreens.includes(route.name)
          ? () => {
              return null;
            }
          : undefined,
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTitle: props => (
          <NavigationHeader {...props} hideHome={listOfHiddenProfileButtonScreens.includes(route.name)} />
        ),
        tabBarStyle: {
          backgroundColor: colors.background,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
      })}>
      <Tabs.Screen
        name="map"
        options={{
          tabBarIcon: ({ focused }) => (
            <Avatar.Icon style={{ marginBottom: 18 }} size={focused ? 60 : 46} icon={'map-outline'} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <Avatar.Icon style={{ marginBottom: 18 }} size={focused ? 60 : 46} icon={'chart-donut'} />
          ),
        }}
      />
      <Tabs.Screen
        name="weather"
        options={{
          tabBarIcon: ({ focused }) => (
            <Avatar.Icon style={{ marginBottom: 18 }} size={focused ? 60 : 46} icon={'cloud-outline'} />
          ),
        }}
      />
      <Tabs.Screen name="profile" />
      <Tabs.Screen name="selectLocation" />
      <Tabs.Screen name="device/[deviceName]" /> */}
    </Tabs>
  );
};

export default TabNav;
