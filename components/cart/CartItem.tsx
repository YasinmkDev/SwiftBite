import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { CartItem as CartItemType } from '@/types';

interface CartItemProps {
  item: CartItemType;
  onAdd: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

export function CartItem({ item, onAdd, onDecrement, onRemove }: CartItemProps) {
  const { colors } = useTheme();
  const lineTotal = item.menuItem.price * item.quantity;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        padding: 12,
        marginBottom: 10,
        gap: 12,
      }}
    >
      <Image
        source={{ uri: item.menuItem.imageUrl }}
        style={{ width: 68, height: 68, borderRadius: 10 }}
        resizeMode="cover"
      />

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 2 }}>
          {item.menuItem.name}
        </Text>
        <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accent }}>
          ${lineTotal.toFixed(2)}
        </Text>
        <Text style={{ fontSize: 11, color: colors.textTertiary }}>
          ${item.menuItem.price.toFixed(2)} each
        </Text>
      </View>

      <View style={{ alignItems: 'center', gap: 8 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: colors.bgTertiary,
            borderRadius: 10,
            padding: 4,
          }}
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
            {item.quantity}
          </Text>
          <TouchableOpacity
            onPress={onAdd}
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
        </View>

        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={16} color={colors.error} />
        </TouchableOpacity>
      </View>
    </View>
  );
}
