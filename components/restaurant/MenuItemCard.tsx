import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { MenuItem } from '@/types';

interface MenuItemCardProps {
  item: MenuItem;
  quantity: number;
  onAdd: () => void;
  onDecrement: () => void;
}

const AnimatedView = Animated.View;

export function MenuItemCard({ item, quantity, onAdd, onDecrement }: MenuItemCardProps) {
  const { colors, isDark } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleAdd = () => {
    scale.value = withSpring(1.1, { damping: 10 }, () => {
      scale.value = withSpring(1);
    });
    onAdd();
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: colors.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.2 : 0.06,
        shadowRadius: 6,
        elevation: 2,
      }}
    >
      <View style={{ flex: 1, paddingRight: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 4 }}>
          {item.isPopular && (
            <View style={{ backgroundColor: `${colors.accent}22`, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: colors.accent }}>POPULAR</Text>
            </View>
          )}
          {item.isVegetarian && (
            <View style={{ backgroundColor: `${colors.success}22`, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 }}>
              <Text style={{ fontSize: 10, fontWeight: '700', color: colors.success }}>VEG</Text>
            </View>
          )}
        </View>

        <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 }}>
          {item.name}
        </Text>
        <Text style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 18, marginBottom: 8 }} numberOfLines={2}>
          {item.description}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.accent }}>
            ${item.price.toFixed(2)}
          </Text>

          {quantity === 0 ? (
            <TouchableOpacity
              onPress={handleAdd}
              style={{
                backgroundColor: colors.accent,
                width: 32,
                height: 32,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons name="add" size={18} color="#fff" />
            </TouchableOpacity>
          ) : (
            <AnimatedView
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: colors.bgTertiary,
                  borderRadius: 10,
                  padding: 4,
                },
                animStyle,
              ]}
            >
              <TouchableOpacity
                onPress={onDecrement}
                style={{
                  backgroundColor: colors.bgCard,
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="remove" size={16} color={colors.accent} />
              </TouchableOpacity>
              <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, minWidth: 18, textAlign: 'center' }}>
                {quantity}
              </Text>
              <TouchableOpacity
                onPress={handleAdd}
                style={{
                  backgroundColor: colors.accent,
                  width: 28,
                  height: 28,
                  borderRadius: 8,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="add" size={16} color="#fff" />
              </TouchableOpacity>
            </AnimatedView>
          )}
        </View>
      </View>

      <Image
        source={{ uri: item.imageUrl }}
        style={{ width: 90, height: 90, borderRadius: 12 }}
        resizeMode="cover"
      />
    </View>
  );
}
