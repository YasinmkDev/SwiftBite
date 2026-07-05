import React, { useRef } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import type { Category } from '@/types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string;
  onSelect: (id: string) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ChipProps {
  category: Category;
  isSelected: boolean;
  onPress: () => void;
}

function Chip({ category, isSelected, onPress }: ChipProps) {
  const { colors } = useTheme();
  const scale = useSharedValue(1);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedTouchable
      onPress={onPress}
      onPressIn={() => { scale.value = withSpring(0.93); }}
      onPressOut={() => { scale.value = withSpring(1); }}
      activeOpacity={0.85}
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
          paddingHorizontal: 16,
          paddingVertical: 9,
          borderRadius: 999,
          marginRight: 8,
          borderWidth: 1.5,
          backgroundColor: isSelected ? colors.accent : 'transparent',
          borderColor: isSelected ? colors.accent : colors.border,
        },
        animStyle,
      ]}
    >
      <Ionicons
        name={category.icon as keyof typeof Ionicons.glyphMap}
        size={15}
        color={isSelected ? '#FFFFFF' : colors.textSecondary}
      />
      <Text
        style={{
          fontSize: 13,
          fontWeight: '600',
          color: isSelected ? '#FFFFFF' : colors.textSecondary,
        }}
      >
        {category.name}
      </Text>
    </AnimatedTouchable>
  );
}

export function CategoryFilter({ categories, selected, onSelect }: CategoryFilterProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 4 }}
    >
      {categories.map((cat) => (
        <Chip
          key={cat.id}
          category={cat}
          isSelected={selected === cat.id}
          onPress={() => onSelect(cat.id)}
        />
      ))}
    </ScrollView>
  );
}
