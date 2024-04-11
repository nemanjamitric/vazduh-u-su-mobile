import React, { useCallback } from 'react';
import { Stack } from 'expo-router/stack';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import useTheme from '../hooks/useTheme';
import { SplashScreen } from 'expo-router';
import { useFonts } from 'expo-font';
import { View } from 'react-native';

const client = new ApolloClient({
  uri: 'http://192.168.0.133:4000/',
  cache: new InMemoryCache(),
});

export default function AppLayout() {
  const CustomTheme = useTheme();
  const [fontsLoaded, fontError] = useFonts({
      'Regular': require('../assets/fonts/Rubik-Regular.ttf'),
      'Italic': require('../assets/fonts/Rubik-Italic.ttf'),
      'Black': require('../assets/fonts/Rubik-Black.ttf'),
      'BlackItalic': require('../assets/fonts/Rubik-BlackItalic.ttf'),
      'Bold': require('../assets/fonts/Rubik-Bold.ttf'),
      'BoldItalic': require('../assets/fonts/Rubik-BoldItalic.ttf'),
      'Light': require('../assets/fonts/Rubik-Light.ttf'),
      'LightItalic': require('../assets/fonts/Rubik-LightItalic.ttf'),
      'Medium': require('../assets/fonts/Rubik-Medium.ttf'),
      'MediumItalic': require('../assets/fonts/Rubik-MediumItalic.ttf'),
      'SemiBold': require('../assets/fonts/Rubik-SemiBold.ttf'),
      'SemiBoldItalic': require('../assets/fonts/Rubik-SemiBoldItalic.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }
  return (
    <View style={{flex: 1}} onLayout={onLayoutRootView} >
    <ApolloProvider client={client}>
      <PaperProvider theme={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ApolloProvider>
    </View>
  );
}