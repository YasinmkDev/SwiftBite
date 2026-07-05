import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { Restaurant } from '@/types';

interface RestaurantCardProps {
  restaurant: Restaurant;
  onPress: () => void;
}

export function RestaurantCard({ restaurant, onPress }: RestaurantCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
        marginHorizontal: 20,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: isDark ? 0 : 1,
        borderColor: colors.borderLight,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: isDark ? 0.3 : 0.07,
        shadowRadius: 8,
        elevation: 3,
      }}
    >
      <View style={{ position: 'relative' }}>
        <Image
          source={{ uri: restaurant.imageUrl }}
          style={{ width: '100%', height: 160 }}
          resizeMode="cover"
        />
        {!restaurant.isOpen && (
          <View
            style={{
              position: 'absolute',
              inset: 0,
              backgroundColor: 'rgba(0,0,0,0.6)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16 }}>Closed</Text>
          </View>
        )}
        <View
          style={{
            position: 'absolute',
            top: 10,
            left: 10,
            flexDirection: 'row',
            gap: 6,
          }}
        >
          {restaurant.tags.slice(0, 1).map((tag) => (
            <View
              key={tag}
              style={{
                backgroundColor: 'rgba(0,0,0,0.6)',
                paddingHorizontal: 8,
                paddingVertical: 4,
                borderRadius: 6,
              }}
            >
              <Text style={{ color: '#fff', fontSize: 11, fontWeight: '600' }}>{tag}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{ padding: 14 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, flex: 1, marginRight: 8 }}>
            {restaurant.name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3 }}>
            <Ionicons name="star" size={14} color="#F59E0B" />
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>{restaurant.rating}</Text>
            <Text style={{ fontSize: 12, color: colors.textTertiary }}>({restaurant.reviewCount})</Text>
          </View>
        </View>

        <Text style={{ fontSize: 13, color: colors.textSecondary, marginBottom: 10 }}>
          {restaurant.cuisine.join(' · ')}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="time-outline" size={13} color={colors.textTertiary} />
            <Text style={{ fontSize: 12, color: colors.textTertiary }}>{restaurant.deliveryTime}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="bicycle-outline" size={13} color={colors.textTertiary} />
            <Text style={{ fontSize: 12, color: colors.textTertiary }}>
              {restaurant.deliveryFee === 0 ? 'Free' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="location-outline" size={13} color={colors.textTertiary} />
            <Text style={{ fontSize: 12, color: colors.textTertiary }}>{restaurant.distance}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
