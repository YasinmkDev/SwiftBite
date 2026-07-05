import React, { useRef, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { Restaurant } from '@/types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - 48;

interface FeaturedCarouselProps {
  restaurants: Restaurant[];
}

interface CarouselItemProps {
  restaurant: Restaurant;
  onPress: () => void;
}

function CarouselItem({ restaurant, onPress }: CarouselItemProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.92}
      style={{
        width: CARD_WIDTH,
        marginHorizontal: 6,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: colors.bgCard,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.2,
        shadowRadius: 16,
        elevation: 10,
      }}
    >
      <Image
        source={{ uri: restaurant.imageUrl }}
        style={{ width: '100%', height: 200 }}
        resizeMode="cover"
      />
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
        }}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: -40,
            backgroundColor: 'transparent',
          }}
        />
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.55)',
            borderRadius: 14,
            padding: 12,
          }}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 2 }}>
                {restaurant.name}
              </Text>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}>
                {restaurant.cuisine.join(' · ')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: colors.accent,
                borderRadius: 8,
                paddingHorizontal: 8,
                paddingVertical: 4,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 3,
              }}
            >
              <Ionicons name="star" size={11} color="#fff" />
              <Text style={{ color: '#fff', fontSize: 12, fontWeight: '700' }}>
                {restaurant.rating}
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', gap: 12, marginTop: 8 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="time-outline" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>{restaurant.deliveryTime}</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <Ionicons name="bicycle-outline" size={12} color="rgba(255,255,255,0.8)" />
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12 }}>
                {restaurant.deliveryFee === 0 ? 'Free delivery' : `$${restaurant.deliveryFee.toFixed(2)}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export function FeaturedCarousel({ restaurants }: FeaturedCarouselProps) {
  const router = useRouter();
  const { colors } = useTheme();
  const scrollRef = useRef<ScrollView>(null);
  const currentIndex = useSharedValue(0);
  const autoScrollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const featured = restaurants.filter((r) => r.isFeatured);

  useEffect(() => {
    let idx = 0;
    autoScrollRef.current = setInterval(() => {
      idx = (idx + 1) % featured.length;
      scrollRef.current?.scrollTo({ x: idx * (CARD_WIDTH + 12), animated: true });
      currentIndex.value = idx;
    }, 3500);
    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [featured.length]);

  return (
    <View>
      <ScrollView
        ref={scrollRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18 }}
        snapToInterval={CARD_WIDTH + 12}
        decelerationRate="fast"
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / (CARD_WIDTH + 12));
          currentIndex.value = idx;
        }}
      >
        {featured.map((r) => (
          <CarouselItem
            key={r.id}
            restaurant={r}
            onPress={() => router.push(`/restaurant/${r.id}`)}
          />
        ))}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 12, gap: 6 }}>
        {featured.map((_, i) => (
          <DotIndicator key={i} index={i} currentIndex={currentIndex} accentColor={colors.accent} />
        ))}
      </View>
    </View>
  );
}

interface DotIndicatorProps {
  index: number;
  currentIndex: SharedValue<number>;
  accentColor: string;
}

function DotIndicator({ index, currentIndex, accentColor }: DotIndicatorProps) {
  const animatedStyle = useAnimatedStyle(() => {
    const isActive = Math.round(currentIndex.value) === index;
    return {
      width: withTiming(isActive ? 20 : 6, { duration: 300 }),
      backgroundColor: withTiming(isActive ? accentColor : '#AAAAAA', { duration: 300 }),
    };
  });

  return (
    <Animated.View style={[{ height: 6, borderRadius: 3 }, animatedStyle]} />
  );
}
