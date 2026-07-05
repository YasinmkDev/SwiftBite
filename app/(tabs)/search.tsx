import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { RestaurantCard } from '@/components/home/RestaurantCard';
import { useTheme } from '@/hooks/useTheme';
import { RESTAURANTS, CATEGORIES } from '@/constants/mockData';

const RECENT_SEARCHES = ['Sushi near me', 'Best burgers', 'Vegan bowls', 'Late night pizza'];

const POPULAR_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all').slice(0, 6);

function SkeletonCard() {
  const { colors } = useTheme();
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    const interval = setInterval(() => {
      opacity.value = withTiming(opacity.value === 0.4 ? 0.8 : 0.4, { duration: 700 });
    }, 700);
    return () => clearInterval(interval);
  }, []);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View style={[{ marginHorizontal: 20, marginBottom: 16 }, style]}>
      <View style={{ backgroundColor: colors.bgTertiary, height: 160, borderRadius: 16, marginBottom: 12 }} />
      <View style={{ backgroundColor: colors.bgTertiary, height: 18, borderRadius: 8, width: '60%', marginBottom: 8 }} />
      <View style={{ backgroundColor: colors.bgTertiary, height: 14, borderRadius: 6, width: '40%' }} />
    </Animated.View>
  );
}

export default function SearchScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const results = RESTAURANTS.filter((r) =>
    r.name.toLowerCase().includes(query.toLowerCase()) ||
    r.cuisine.some((c) => c.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSearch = (text: string) => {
    setQuery(text);
    if (text.length > 0) {
      setLoading(true);
      setHasSearched(true);
      setTimeout(() => setLoading(false), 800);
    } else {
      setLoading(false);
      setHasSearched(false);
    }
  };

  const handleRecentSearch = (term: string) => {
    setQuery(term);
    handleSearch(term);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 12 }}>
        <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary, marginBottom: 14 }}>
          Discover
        </Text>

        {/* Search Input */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            backgroundColor: colors.bgSecondary,
            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 4,
            borderWidth: 1.5,
            borderColor: colors.border,
          }}
        >
          <Ionicons name="search-outline" size={18} color={colors.textTertiary} />
          <TextInput
            ref={inputRef}
            placeholder="Restaurants, cuisines, dishes..."
            placeholderTextColor={colors.textTertiary}
            value={query}
            onChangeText={handleSearch}
            style={{ flex: 1, paddingVertical: 12, fontSize: 15, color: colors.textPrimary }}
            autoFocus
            returnKeyType="search"
            selectionColor={colors.accent}
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => { setQuery(''); setHasSearched(false); }}>
              <Ionicons name="close-circle" size={18} color={colors.textTertiary} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {!hasSearched ? (
          <>
            {/* Recent Searches */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>
                Recent Searches
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                {RECENT_SEARCHES.map((term) => (
                  <TouchableOpacity
                    key={term}
                    onPress={() => handleRecentSearch(term)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 6,
                      backgroundColor: colors.bgSecondary,
                      paddingHorizontal: 14,
                      paddingVertical: 8,
                      borderRadius: 999,
                      borderWidth: 1,
                      borderColor: colors.border,
                    }}
                  >
                    <Ionicons name="time-outline" size={13} color={colors.textTertiary} />
                    <Text style={{ fontSize: 13, color: colors.textSecondary }}>{term}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Popular Categories Grid */}
            <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
              <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>
                Popular Categories
              </Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 10 }}>
                {POPULAR_CATEGORIES.map((cat) => (
                  <TouchableOpacity
                    key={cat.id}
                    onPress={() => handleRecentSearch(cat.name)}
                    style={{
                      width: '30%',
                      aspectRatio: 1,
                      backgroundColor: `${cat.color}18`,
                      borderRadius: 16,
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 8,
                      borderWidth: 1,
                      borderColor: `${cat.color}30`,
                    }}
                  >
                    <View
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 22,
                        backgroundColor: `${cat.color}25`,
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Ionicons name={cat.icon as keyof typeof Ionicons.glyphMap} size={22} color={cat.color} />
                    </View>
                    <Text style={{ fontSize: 12, fontWeight: '700', color: colors.textPrimary, textAlign: 'center' }}>
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : loading ? (
          <>
            {[1, 2, 3].map((i) => <SkeletonCard key={i} />)}
          </>
        ) : results.length > 0 ? (
          <View>
            <Text style={{ paddingHorizontal: 20, fontSize: 14, color: colors.textTertiary, marginBottom: 12 }}>
              {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
            </Text>
            {results.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                onPress={() => router.push(`/restaurant/${r.id}`)}
              />
            ))}
          </View>
        ) : (
          <View style={{ alignItems: 'center', paddingVertical: 64, paddingHorizontal: 32 }}>
            <Ionicons name="search" size={52} color={colors.textTertiary} />
            <Text style={{ color: colors.textPrimary, fontSize: 18, fontWeight: '700', marginTop: 16, textAlign: 'center' }}>
              No results found
            </Text>
            <Text style={{ color: colors.textTertiary, fontSize: 14, marginTop: 8, textAlign: 'center', lineHeight: 20 }}>
              We couldn't find anything matching "{query}". Try a different search.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
