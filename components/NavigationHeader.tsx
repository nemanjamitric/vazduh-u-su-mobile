import { Link } from 'expo-router';
import React, { FC } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';

import Logo from '../assets/logo.svg';
import useTheme from '../hooks/useTheme';
import { NavigationHeaderProps } from './../interfaces/interfaces';

const NavigationHeader: FC<NavigationHeaderProps> = props => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.background,
      }}>
      <Logo width={120} height={40} />
      {!props.hideHome && (
        <Link href={'/selectLocation'}>
          <IconButton icon="account" size={35} />
        </Link>
      )}
    </View>
  );
};

export default NavigationHeader;
