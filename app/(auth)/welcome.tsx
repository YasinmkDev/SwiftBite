import React, { useEffect } from 'react';
import { View, Text, Image, Dimensions, StatusBar } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
  withSpring,
  Easing,
} from 'react-native-reanimated';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

const { height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();
  const { colors } = useTheme();

  const heroOpacity = useSharedValue(0);
  const heroTranslate = useSharedValue(30);
  const taglineOpacity = useSharedValue(0);
  const taglineTranslate = useSharedValue(20);
  const ctaOpacity = useSharedValue(0);
  const ctaTranslate = useSharedValue(30);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 800, easing: Easing.out(Easing.quad) });
    heroTranslate.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.quad) });
    taglineOpacity.value = withDelay(400, withTiming(1, { duration: 700 }));
    taglineTranslate.value = withDelay(400, withTiming(0, { duration: 700 }));
    ctaOpacity.value = withDelay(750, withTiming(1, { duration: 600 }));
    ctaTranslate.value = withDelay(750, withSpring(0));
  }, []);

  const heroStyle = useAnimatedStyle(() => ({
    opacity: heroOpacity.value,
    transform: [{ translateY: heroTranslate.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineTranslate.value }],
  }));

  const ctaStyle = useAnimatedStyle(() => ({
    opacity: ctaOpacity.value,
    transform: [{ translateY: ctaTranslate.value }],
  }));

  return (
    <View style={{ flex: 1, backgroundColor: '#0A0A0A' }}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[{ flex: 1 }, heroStyle]}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg' }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.55)',
          }}
        />
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: height * 0.5,
            backgroundColor: 'transparent',
          }}
        />
      </Animated.View>

      <SafeAreaView
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, paddingHorizontal: 28, paddingBottom: 40 }}
        edges={['bottom']}
      >
        <Animated.View style={[{ marginBottom: 36 }, taglineStyle]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 14 }}>
            <View
              style={{
                backgroundColor: colors.accent,
                paddingHorizontal: 12,
                paddingVertical: 6,
                borderRadius: 8,
              }}
            >
              <Text style={{ color: '#fff', fontWeight: '800', fontSize: 13, letterSpacing: 1 }}>SWIFTBITE</Text>
            </View>
          </View>
          <Text style={{ color: '#FFFFFF', fontSize: 38, fontWeight: '800', lineHeight: 44, marginBottom: 12 }}>
            Food you love,{'\n'}delivered fast.
          </Text>
          <Text style={{ color: 'rgba(255,255,255,0.75)', fontSize: 16, lineHeight: 24 }}>
            Order from the best restaurants near you. Hot food at your door in 30 minutes or less.
          </Text>
        </Animated.View>

        <Animated.View style={[{ gap: 12 }, ctaStyle]}>
          <Button
            label="Get Started"
            onPress={() => router.push('/(auth)/signup')}
            variant="primary"
            size="lg"
            fullWidth
          />
          <Button
            label="Sign In"
            onPress={() => router.push('/(auth)/login')}
            variant="outline"
            size="lg"
            fullWidth
            style={{ borderColor: 'rgba(255,255,255,0.4)' }}
            textStyle={{ color: '#FFFFFF' }}
          />
        </Animated.View>
      </SafeAreaView>
    </View>
  );
}
