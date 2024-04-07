import React from 'react';
import { Stack } from 'expo-router/stack';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { PaperProvider } from 'react-native-paper';
import useTheme from '../hooks/useTheme';

const client = new ApolloClient({
  uri: 'http://192.168.0.133:4000/',
  cache: new InMemoryCache(),
});

export default function AppLayout() {
  const CustomTheme = useTheme();
  return (
    <ApolloProvider client={client}>
      <PaperProvider theme={CustomTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PaperProvider>
    </ApolloProvider>
  );
}