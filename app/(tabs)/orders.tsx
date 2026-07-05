import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { ACTIVE_ORDER, PAST_ORDERS } from '@/constants/mockData';
import type { OrderStatus, Order } from '@/types';

const ORDER_STEPS: { key: OrderStatus; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'confirmed', label: 'Confirmed', icon: 'checkmark-circle-outline' },
  { key: 'preparing', label: 'Preparing', icon: 'restaurant-outline' },
  { key: 'on_the_way', label: 'On the way', icon: 'bicycle-outline' },
  { key: 'delivered', label: 'Delivered', icon: 'home-outline' },
];

function getStepIndex(status: OrderStatus): number {
  const map: Record<OrderStatus, number> = {
    confirmed: 0,
    preparing: 1,
    on_the_way: 2,
    delivered: 3,
    cancelled: -1,
  };
  return map[status];
}

interface ProgressStepProps {
  step: typeof ORDER_STEPS[number];
  index: number;
  currentStep: number;
}

function ProgressStep({ step, index, currentStep }: ProgressStepProps) {
  const { colors } = useTheme();
  const isDone = index <= currentStep;
  const isActive = index === currentStep;

  const scale = useSharedValue(0.8);
  const opacity = useSharedValue(0);

  React.useEffect(() => {
    if (isDone) {
      scale.value = withDelay(index * 200, withTiming(1, { duration: 400 }));
      opacity.value = withDelay(index * 200, withTiming(1, { duration: 400 }));
    }
  }, [isDone]);

  const animStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  return (
    <View style={{ alignItems: 'center', flex: 1 }}>
      <Animated.View
        style={[
          {
            width: 44,
            height: 44,
            borderRadius: 22,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDone ? colors.accent : colors.bgTertiary,
            borderWidth: 2,
            borderColor: isDone ? colors.accent : colors.border,
          },
          animStyle,
        ]}
      >
        <Ionicons name={step.icon} size={20} color={isDone ? '#fff' : colors.textTertiary} />
      </Animated.View>
      <Text
        style={{
          fontSize: 11,
          marginTop: 6,
          fontWeight: isActive ? '700' : '500',
          color: isDone ? colors.accent : colors.textTertiary,
          textAlign: 'center',
        }}
      >
        {step.label}
      </Text>
    </View>
  );
}

interface PastOrderCardProps {
  order: Order;
}

function PastOrderCard({ order }: PastOrderCardProps) {
  const { colors, isDark } = useTheme();
  const itemSummary = order.items.map((i) => `${i.quantity}x ${i.name}`).join(', ');

  return (
    <View
      style={{
        backgroundColor: colors.bgCard,
        borderRadius: 16,
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
      <View style={{ flexDirection: 'row', gap: 12, alignItems: 'center' }}>
        <Image
          source={{ uri: order.restaurantImageUrl }}
          style={{ width: 56, height: 56, borderRadius: 12 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary }}>{order.restaurantName}</Text>
          <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 2 }} numberOfLines={1}>{itemSummary}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 }}>
            <Text style={{ fontSize: 14, fontWeight: '700', color: colors.accent }}>${order.totalAmount.toFixed(2)}</Text>
            <View style={{ backgroundColor: `${colors.success}22`, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 6 }}>
              <Text style={{ color: colors.success, fontSize: 11, fontWeight: '700' }}>Delivered</Text>
            </View>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          marginTop: 12,
          paddingVertical: 10,
          borderRadius: 10,
          backgroundColor: colors.bgTertiary,
          alignItems: 'center',
        }}
      >
        <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '700' }}>Reorder</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function OrdersScreen() {
  const { colors } = useTheme();
  const currentStep = getStepIndex(ACTIVE_ORDER.status);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary }}>Your Orders</Text>
        </View>

        {/* Active Order */}
        <View style={{ paddingHorizontal: 20, marginBottom: 28 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>
            Active Order
          </Text>

          <View
            style={{
              backgroundColor: colors.bgCard,
              borderRadius: 20,
              padding: 18,
              shadowColor: colors.accent,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.12,
              shadowRadius: 12,
              elevation: 6,
              borderWidth: 1,
              borderColor: `${colors.accent}30`,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <Image
                source={{ uri: ACTIVE_ORDER.restaurantImageUrl }}
                style={{ width: 48, height: 48, borderRadius: 12 }}
                resizeMode="cover"
              />
              <View>
                <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary }}>
                  {ACTIVE_ORDER.restaurantName}
                </Text>
                <Text style={{ fontSize: 12, color: colors.textTertiary }}>
                  Est. arrival: 6:15 PM · {ACTIVE_ORDER.items.length} item{ACTIVE_ORDER.items.length !== 1 ? 's' : ''}
                </Text>
              </View>
              <View
                style={{
                  marginLeft: 'auto',
                  backgroundColor: `${colors.warning}22`,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: colors.warning, fontSize: 12, fontWeight: '700' }}>Live</Text>
              </View>
            </View>

            {/* Progress Tracker */}
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', position: 'relative' }}>
              {/* Connector lines */}
              {ORDER_STEPS.map((_, i) =>
                i < ORDER_STEPS.length - 1 ? (
                  <View
                    key={`line-${i}`}
                    style={{
                      position: 'absolute',
                      top: 21,
                      left: `${(i + 0.5) * (100 / ORDER_STEPS.length)}%` as never,
                      width: `${100 / ORDER_STEPS.length}%` as never,
                      height: 2,
                      backgroundColor: i < currentStep ? colors.accent : colors.border,
                    }}
                  />
                ) : null
              )}
              {ORDER_STEPS.map((step, i) => (
                <ProgressStep key={step.key} step={step} index={i} currentStep={currentStep} />
              ))}
            </View>

            <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 16, textAlign: 'center' }}>
              Your food is being lovingly prepared
            </Text>
          </View>
        </View>

        {/* Past Orders */}
        <View style={{ paddingHorizontal: 20, marginBottom: 24 }}>
          <Text style={{ fontSize: 16, fontWeight: '700', color: colors.textPrimary, marginBottom: 12 }}>
            Past Orders
          </Text>
          {PAST_ORDERS.map((order) => (
            <PastOrderCard key={order.id} order={order} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
