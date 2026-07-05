import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  withSequence,
  withRepeat,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

function ConfettiDot({ delay, x, colors }: { delay: number; x: number; colors: ReturnType<typeof useTheme>['colors'] }) {
  const y = useSharedValue(-20);
  const opacity = useSharedValue(0);
  const rot = useSharedValue(0);

  const dotColors = [colors.accent, colors.success, colors.warning, colors.info, colors.accentLight];
  const color = dotColors[Math.floor(Math.abs(x) * 7) % dotColors.length];

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 200 }));
    y.value = withDelay(delay, withSpring(Math.random() * 300 + 100, { damping: 8, stiffness: 60 }));
    rot.value = withDelay(delay, withTiming(360 * (Math.random() > 0.5 ? 1 : -1), { duration: 1200 }));
  }, []);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: y.value }, { rotate: `${rot.value}deg` }],
    opacity: opacity.value,
  }));

  const size = 8 + (Math.abs(x * 13) % 10);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          left: `${(x + 1) * 50}%` as never,
          top: 0,
          width: size,
          height: size,
          borderRadius: 2,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
}

export default function OrderSuccessScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const checkScale = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslate = useSharedValue(24);
  const pulse = useSharedValue(1);

  useEffect(() => {
    checkScale.value = withDelay(300, withSpring(1, { damping: 8, stiffness: 120 }));
    contentOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
    contentTranslate.value = withDelay(600, withSpring(0));
    pulse.value = withDelay(800, withRepeat(withSequence(
      withTiming(1.08, { duration: 600 }),
      withTiming(1, { duration: 600 })
    ), 3, false));
  }, []);

  const checkStyle = useAnimatedStyle(() => ({
    transform: [{ scale: checkScale.value * pulse.value }],
  }));

  const contentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslate.value }],
  }));

  const confettiDots = Array.from({ length: 20 }, (_, i) => ({
    x: (i / 10) - 1,
    delay: i * 60,
  }));

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* Confetti */}
      <View style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 400, overflow: 'hidden' }} pointerEvents="none">
        {confettiDots.map((dot, i) => (
          <ConfettiDot key={i} delay={dot.delay} x={dot.x} colors={colors} />
        ))}
      </View>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 28 }}>
        {/* Check Circle */}
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              borderRadius: 50,
              backgroundColor: `${colors.success}18`,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 28,
              borderWidth: 2,
              borderColor: `${colors.success}40`,
            },
            checkStyle,
          ]}
        >
          <View
            style={{
              width: 72,
              height: 72,
              borderRadius: 36,
              backgroundColor: colors.success,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Ionicons name="checkmark" size={38} color="#fff" />
          </View>
        </Animated.View>

        <Animated.View style={[{ alignItems: 'center' }, contentStyle]}>
          <Text style={{ fontSize: 28, fontWeight: '800', color: colors.textPrimary, marginBottom: 8, textAlign: 'center' }}>
            Order Placed!
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: colors.textSecondary,
              textAlign: 'center',
              lineHeight: 24,
              marginBottom: 32,
            }}
          >
            Your order has been confirmed and is being{'\n'}lovingly prepared right now.
          </Text>

          {/* Order Card */}
          <View
            style={{
              backgroundColor: colors.bgCard,
              borderRadius: 20,
              padding: 20,
              width: '100%',
              marginBottom: 32,
              borderWidth: 1,
              borderColor: colors.borderLight,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 13, color: colors.textTertiary }}>Order ID</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>#SW-44821</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={{ fontSize: 13, color: colors.textTertiary }}>Estimated delivery</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>25–35 min</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 13, color: colors.textTertiary }}>Delivering to</Text>
              <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary }}>14 Maple St, Apt 3B</Text>
            </View>
          </View>

          <View style={{ gap: 12, width: '100%' }}>
            <Button
              label="Track Order"
              onPress={() => router.replace('/(tabs)/orders')}
              variant="primary"
              size="lg"
              fullWidth
            />
            <Button
              label="Back to Home"
              onPress={() => router.replace('/(tabs)')}
              variant="outline"
              size="lg"
              fullWidth
            />
          </View>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}
