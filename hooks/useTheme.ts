import { useColorScheme as useRNColorScheme } from 'react-native';
import { COLORS_DARK, COLORS_LIGHT, type ColorPalette } from '@/constants/colors';

export function useTheme(): { colors: ColorPalette; isDark: boolean } {
  const scheme = useRNColorScheme();
  const isDark = scheme === 'dark';
  return {
    colors: isDark ? COLORS_DARK : COLORS_LIGHT,
    isDark,
  };
}
