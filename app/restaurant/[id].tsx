import React, { useState, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { MenuItemCard } from '@/components/restaurant/MenuItemCard';
import { ReviewCard } from '@/components/restaurant/ReviewCard';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useCartContext } from '@/context/CartContext';
import { RESTAURANTS, MENU_ITEMS, MENU_CATEGORIES, REVIEWS } from '@/constants/mockData';

const HERO_HEIGHT = 280;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const { addItem, decrementItem, getItemQuantity, totalItems, subtotal, cart } = useCartContext();
  const [activeCategory, setActiveCategory] = useState('starters');
  const scrollY = useSharedValue(0);

  const restaurant = RESTAURANTS.find((r) => r.id === id);

  const scrollHandler = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  const heroStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(scrollY.value, [0, HERO_HEIGHT], [0, HERO_HEIGHT * 0.4], Extrapolation.CLAMP),
      },
    ],
  }));

  const headerOpacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [HERO_HEIGHT - 80, HERO_HEIGHT], [0, 1], Extrapolation.CLAMP),
  }));

  if (!restaurant) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ color: colors.textPrimary }}>Restaurant not found</Text>
      </SafeAreaView>
    );
  }

  const menuByCategory = MENU_CATEGORIES.map((cat) => ({
    ...cat,
    items: MENU_ITEMS.filter((i) => i.restaurantId === restaurant.id && i.categoryId === cat.id),
  })).filter((cat) => cat.items.length > 0);

  const restaurantReviews = REVIEWS.filter((r) => r.restaurantId === restaurant.id);

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Animated Sticky Header */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: colors.bg,
            paddingTop: insets.top,
            paddingHorizontal: 16,
            paddingBottom: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
          },
          headerOpacityStyle,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={{ flex: 1, fontSize: 17, fontWeight: '700', color: colors.textPrimary }}>
            {restaurant.name}
          </Text>
        </View>
      </Animated.View>

      {/* Back button overlay (always visible) */}
      <View
        style={{
          position: 'absolute',
          top: insets.top + 8,
          left: 16,
          zIndex: 200,
        }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 38,
            height: 38,
            borderRadius: 12,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image with Parallax */}
        <View style={{ height: HERO_HEIGHT, overflow: 'hidden' }}>
          <Animated.Image
            source={{ uri: restaurant.imageUrl }}
            style={[{ width: SCREEN_WIDTH, height: HERO_HEIGHT + 60 }, heroStyle]}
            resizeMode="cover"
          />
          <View style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.25)' }} />
        </View>

        {/* Restaurant Info */}
        <View style={{ backgroundColor: colors.bg, padding: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
            <Text style={{ fontSize: 24, fontWeight: '800', color: colors.textPrimary, flex: 1, marginRight: 12 }}>
              {restaurant.name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="star" size={16} color="#F59E0B" />
              <Text style={{ fontSize: 16, fontWeight: '800', color: colors.textPrimary }}>{restaurant.rating}</Text>
              <Text style={{ fontSize: 13, color: colors.textTertiary }}>({restaurant.reviewCount})</Text>
            </View>
          </View>

          <Text style={{ fontSize: 14, color: colors.textSecondary, marginBottom: 14 }}>
            {restaurant.cuisine.join(' · ')}
          </Text>

          <Text style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 20, marginBottom: 16 }}>
            {restaurant.description}
          </Text>

          <View style={{ flexDirection: 'row', gap: 16 }}>
            <InfoChip icon="time-outline" label={restaurant.deliveryTime} colors={colors} />
            <InfoChip
              icon="bicycle-outline"
              label={restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)} delivery`}
              colors={colors}
            />
            <InfoChip icon="cash-outline" label={`$${restaurant.minOrder} min`} colors={colors} />
          </View>
        </View>

        {/* Menu Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ backgroundColor: colors.bg, borderBottomWidth: 1, borderBottomColor: colors.borderLight }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 4 }}
        >
          {menuByCategory.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              onPress={() => setActiveCategory(cat.id)}
              style={{
                paddingHorizontal: 18,
                paddingVertical: 10,
                marginRight: 4,
                borderBottomWidth: 2,
                borderBottomColor: activeCategory === cat.id ? colors.accent : 'transparent',
              }}
            >
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: activeCategory === cat.id ? '700' : '500',
                  color: activeCategory === cat.id ? colors.accent : colors.textSecondary,
                }}
              >
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items */}
        <View style={{ padding: 16 }}>
          {menuByCategory
            .filter((cat) => cat.id === activeCategory)
            .flatMap((cat) => cat.items)
            .map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                quantity={getItemQuantity(item.id)}
                onAdd={() => addItem(item, restaurant.id, restaurant.name)}
                onDecrement={() => decrementItem(item.id)}
              />
            ))}
        </View>

        {/* Reviews */}
        {restaurantReviews.length > 0 && (
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>
              Reviews
            </Text>
            {restaurantReviews.map((rev) => (
              <ReviewCard key={rev.id} review={rev} />
            ))}
          </View>
        )}

        {totalItems > 0 && <View style={{ height: 90 }} />}
      </Animated.ScrollView>

      {/* Floating Cart CTA */}
      {totalItems > 0 && (
        <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: 16, backgroundColor: 'transparent' }}>
          <TouchableOpacity
            onPress={() => router.push('/cart')}
            style={{
              backgroundColor: colors.accent,
              borderRadius: 16,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 16,
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.5,
              shadowRadius: 16,
              elevation: 12,
            }}
          >
            <View
              style={{
                backgroundColor: 'rgba(255,255,255,0.25)',
                width: 28,
                height: 28,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13 }}>{totalItems}</Text>
            </View>
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>View Cart</Text>
            <Text style={{ color: 'rgba(255,255,255,0.85)', fontSize: 15, fontWeight: '600' }}>
              ${subtotal.toFixed(2)}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

interface InfoChipProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  colors: ReturnType<typeof useTheme>['colors'];
}

function InfoChip({ icon, label, colors }: InfoChipProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.bgSecondary,
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
      }}
    >
      <Ionicons name={icon} size={13} color={colors.textTertiary} />
      <Text style={{ fontSize: 12, color: colors.textTertiary, fontWeight: '500' }}>{label}</Text>
    </View>
  );
}
