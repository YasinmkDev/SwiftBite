import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useTheme } from '@/hooks/useTheme';
import type { ButtonVariant, ButtonSize } from '@/types';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.96, { damping: 15 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15 });
  };

  const containerStyles: ViewStyle[] = [
    {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 8,
    },
    size === 'sm' && { paddingHorizontal: 16, paddingVertical: 8 },
    size === 'md' && { paddingHorizontal: 24, paddingVertical: 14 },
    size === 'lg' && { paddingHorizontal: 32, paddingVertical: 18 },
    fullWidth && { width: '100%' as never },
    variant === 'primary' && { backgroundColor: disabled ? colors.textTertiary : colors.accent },
    variant === 'secondary' && { backgroundColor: colors.bgTertiary },
    variant === 'outline' && { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.accent },
    variant === 'ghost' && { backgroundColor: 'transparent' },
    style ?? {},
  ].filter(Boolean) as ViewStyle[];

  const labelStyles: TextStyle[] = [
    { fontWeight: '600' },
    size === 'sm' && { fontSize: 13 },
    size === 'md' && { fontSize: 15 },
    size === 'lg' && { fontSize: 17 },
    variant === 'primary' && { color: '#FFFFFF' },
    variant === 'secondary' && { color: colors.textPrimary },
    variant === 'outline' && { color: colors.accent },
    variant === 'ghost' && { color: colors.accent },
    textStyle ?? {},
  ].filter(Boolean) as TextStyle[];

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      activeOpacity={0.9}
      style={[animatedStyle, ...containerStyles]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={variant === 'primary' ? '#FFF' : colors.accent} />
      ) : (
        <Text style={labelStyles}>{label}</Text>
      )}
    </AnimatedTouchable>
  );
}
