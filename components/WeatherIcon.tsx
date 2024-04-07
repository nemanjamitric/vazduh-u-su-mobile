import React, { useMemo } from 'react';
import { Image } from 'react-native';

import { getWeatherIcon } from '../functions/meteoTransform';

interface Props {
  size: string;
  code: number;
}

const WeatherIcon: React.FC<Props> = ({ size, code }) => {
  const renderIcon = useMemo(() => {
    if (size === 'large') {
      return <Image style={{ width: 100, height: 100 }} source={getWeatherIcon(code)} />;
    }
    if (size === 'small') {
      return <Image style={{ width: 60, height: 60 }} source={getWeatherIcon(code)} />;
    }
    return <Image style={{ width: 40, height: 40 }} source={getWeatherIcon(code)} />;
  }, [size, code]);
  return renderIcon;
};

export default WeatherIcon;
