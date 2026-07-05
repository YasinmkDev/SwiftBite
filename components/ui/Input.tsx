import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ViewStyle, TextInputProps } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: keyof typeof Ionicons.glyphMap;
  secure?: boolean;
  containerStyle?: ViewStyle;
}

export function Input({
  label,
  error,
  icon,
  secure = false,
  containerStyle,
  ...props
}: InputProps) {
  const { colors, isDark } = useTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColor = error
    ? colors.error
    : isFocused
    ? colors.accent
    : colors.border;

  return (
    <View style={[{ gap: 6 }, containerStyle]}>
      {label && (
        <Text style={{ fontSize: 13, fontWeight: '600', color: colors.textSecondary }}>{label}</Text>
      )}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: isDark ? colors.bgTertiary : colors.bgSecondary,
          borderRadius: 10,
          borderWidth: 1.5,
          borderColor,
          paddingHorizontal: 14,
          gap: 10,
        }}
      >
        {icon && <Ionicons name={icon} size={18} color={isFocused ? colors.accent : colors.textTertiary} />}
        <TextInput
          {...props}
          secureTextEntry={secure && !showPassword}
          onFocus={(e) => { setIsFocused(true); props.onFocus?.(e); }}
          onBlur={(e) => { setIsFocused(false); props.onBlur?.(e); }}
          style={{
            flex: 1,
            paddingVertical: 14,
            fontSize: 15,
            color: colors.textPrimary,
          }}
          placeholderTextColor={colors.textTertiary}
          selectionColor={colors.accent}
        />
        {secure && (
          <TouchableOpacity onPress={() => setShowPassword((v) => !v)} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={18} color={colors.textTertiary} />
          </TouchableOpacity>
        )}
      </View>
      {error && (
        <Text style={{ fontSize: 12, color: colors.error }}>{error}</Text>
      )}
    </View>
  );
}
