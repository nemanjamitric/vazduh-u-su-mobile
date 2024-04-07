import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import useTheme from '../hooks/useTheme';

type ScreenProps = {
    children: string | JSX.Element | JSX.Element[],
    withoutScrollView?: boolean
  }

const Screen: React.FC<ScreenProps> = ({ children, withoutScrollView }) => {
  const { colors } = useTheme();

  if (withoutScrollView) {
    return <View style={[styles.container, { backgroundColor: colors.background }]}>{children}</View>;
  }

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { backgroundColor: colors.background }]}
      keyboardShouldPersistTaps="handled">
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 12,
  },
});

export default Screen;
