import React from 'react';
import { View, ViewStyle } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
  borderRadius?: number;
  shadow?: boolean;
}

export function Card({
  children,
  style,
  padding = 16,
  borderRadius = 16,
  shadow = true,
}: CardProps) {
  const { colors, isDark } = useTheme();

  const shadowStyle: ViewStyle = shadow
    ? isDark
      ? { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 6 }
      : { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }
    : {};

  return (
    <View
      style={[
        {
          backgroundColor: colors.bgCard,
          borderRadius,
          padding,
          borderWidth: isDark ? 0 : 1,
          borderColor: colors.borderLight,
        },
        shadowStyle,
        style,
      ]}
    >
      {children}
    </View>
  );
}
