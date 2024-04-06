import { useColorScheme } from 'react-native';
import { MD3DarkTheme, MD3LightTheme, MD3Theme } from 'react-native-paper';

export default function useTheme(): MD3Theme {
  const colorScheme = useColorScheme();

  const baseTheme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  const theme: MD3Theme = {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#009988',
      secondary: '#FFC107',
    },
  };

  return theme;
}
