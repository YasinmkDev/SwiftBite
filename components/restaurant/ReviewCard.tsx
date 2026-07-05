import React from 'react';
import { View, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { Review } from '@/types';

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const { colors, isDark } = useTheme();

  return (
    <View
      style={{
        backgroundColor: colors.bgCard,
        borderRadius: 14,
        padding: 14,
        marginBottom: 12,
        borderWidth: isDark ? 0 : 1,
        borderColor: colors.borderLight,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10, gap: 10 }}>
        <Image
          source={{ uri: review.userAvatar }}
          style={{ width: 40, height: 40, borderRadius: 20 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '700', color: colors.textPrimary }}>{review.userName}</Text>
          <Text style={{ fontSize: 11, color: colors.textTertiary }}>{review.date}</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Ionicons
              key={i}
              name={i < review.rating ? 'star' : 'star-outline'}
              size={13}
              color="#F59E0B"
            />
          ))}
        </View>
      </View>

      <Text style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 20 }}>
        {review.comment}
      </Text>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 10 }}>
        <Ionicons name="thumbs-up-outline" size={13} color={colors.textTertiary} />
        <Text style={{ fontSize: 12, color: colors.textTertiary }}>{review.helpful} found this helpful</Text>
      </View>
    </View>
  );
}
