import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { FeaturedCarousel } from '@/components/home/FeaturedCarousel';
import { CategoryFilter } from '@/components/home/CategoryFilter';
import { RestaurantCard } from '@/components/home/RestaurantCard';
import { useTheme } from '@/hooks/useTheme';
import { useCartContext } from '@/context/CartContext';
import { CATEGORIES, RESTAURANTS } from '@/constants/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const { totalItems } = useCartContext();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all'
    ? RESTAURANTS
    : RESTAURANTS.filter((r) =>
        r.cuisine.some((c) => c.toLowerCase() === selectedCategory) ||
        selectedCategory === 'healthy' && r.cuisine.includes('Healthy') ||
        selectedCategory === 'pasta' && r.cuisine.includes('Italian') ||
        selectedCategory === 'tacos' && r.cuisine.includes('Mexican')
      );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Sticky Header */}
        <View
          style={{
            backgroundColor: colors.bg,
            paddingHorizontal: 20,
            paddingVertical: 12,
            borderBottomWidth: 1,
            borderBottomColor: colors.borderLight,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
              <Ionicons name="location-sharp" size={18} color={colors.accent} />
              <View>
                <Text style={{ fontSize: 11, color: colors.textTertiary, fontWeight: '500' }}>Delivering to</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>14 Maple Street</Text>
                  <Ionicons name="chevron-down" size={14} color={colors.textPrimary} />
                </View>
              </View>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: colors.bgSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="notifications-outline" size={20} color={colors.textPrimary} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push('/cart')}
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  backgroundColor: colors.bgSecondary,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Ionicons name="bag-outline" size={20} color={colors.textPrimary} />
                {totalItems > 0 && (
                  <View
                    style={{
                      position: 'absolute',
                      top: -4,
                      right: -4,
                      backgroundColor: colors.accent,
                      width: 16,
                      height: 16,
                      borderRadius: 8,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>{totalItems}</Text>
                  </View>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Search Bar */}
          <TouchableOpacity
            onPress={() => router.push('/(tabs)/search')}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              backgroundColor: colors.bgSecondary,
              borderRadius: 12,
              paddingHorizontal: 14,
              paddingVertical: 12,
              borderWidth: 1,
              borderColor: colors.borderLight,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.05,
              shadowRadius: 4,
            }}
          >
            <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
            <Text style={{ color: colors.textTertiary, fontSize: 14 }}>Search restaurants or dishes...</Text>
          </TouchableOpacity>
        </View>

        {/* Hero greeting */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 8 }}>
          <Text style={{ fontSize: 22, fontWeight: '800', color: colors.textPrimary }}>
            What are you{' '}
            <Text style={{ color: colors.accent }}>craving</Text>
            {' '}today?
          </Text>
        </View>

        {/* Category Filter */}
        <View style={{ marginVertical: 12 }}>
          <CategoryFilter
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </View>

        {/* Featured Section */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>Featured</Text>
            <TouchableOpacity>
              <Text style={{ fontSize: 13, color: colors.accent, fontWeight: '600' }}>See all</Text>
            </TouchableOpacity>
          </View>
          <FeaturedCarousel restaurants={RESTAURANTS} />
        </View>

        {/* Near You */}
        <View style={{ marginBottom: 24 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 12, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: '700', color: colors.textPrimary }}>Near You</Text>
            <Text style={{ fontSize: 13, color: colors.textTertiary }}>{filtered.length} places</Text>
          </View>
          {filtered.map((r) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              onPress={() => router.push(`/restaurant/${r.id}`)}
            />
          ))}
          {filtered.length === 0 && (
            <View style={{ alignItems: 'center', paddingVertical: 48 }}>
              <Ionicons name="sad-outline" size={48} color={colors.textTertiary} />
              <Text style={{ color: colors.textTertiary, fontSize: 16, marginTop: 12, fontWeight: '600' }}>
                No restaurants found
              </Text>
              <Text style={{ color: colors.textTertiary, fontSize: 13, marginTop: 4 }}>
                Try a different category
              </Text>
            </View>
          )}
        </View>

        {/* Cart FAB spacer */}
        {totalItems > 0 && <View style={{ height: 80 }} />}
      </ScrollView>

      {/* Floating Cart Button */}
      {totalItems > 0 && (
        <TouchableOpacity
          onPress={() => router.push('/cart')}
          style={{
            position: 'absolute',
            bottom: 16,
            left: 20,
            right: 20,
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
            <Text style={{ color: '#fff', fontWeight: '800', fontSize: 14 }}>{totalItems}</Text>
          </View>
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>View Cart</Text>
          <Ionicons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
}
