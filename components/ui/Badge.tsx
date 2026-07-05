import React from 'react';
import { View, Text, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { BadgeVariant } from '@/types';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  style?: ViewStyle;
}

export function Badge({ label, variant = 'info', icon, style }: BadgeProps) {
  const { colors } = useTheme();

  const variantColors: Record<BadgeVariant, { bg: string; text: string }> = {
    success: { bg: `${colors.success}22`, text: colors.success },
    warning: { bg: `${colors.warning}22`, text: colors.warning },
    error: { bg: `${colors.error}22`, text: colors.error },
    info: { bg: `${colors.info}22`, text: colors.info },
  };

  const { bg, text } = variantColors[variant];

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          paddingHorizontal: 10,
          paddingVertical: 4,
          borderRadius: 999,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      {icon && <Ionicons name={icon} size={11} color={text} />}
      <Text style={{ fontSize: 11, fontWeight: '600', color: text }}>{label}</Text>
    </View>
  );
}
