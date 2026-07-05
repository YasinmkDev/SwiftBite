import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { CartProvider } from '@/context/CartContext';
import { useColorScheme } from '@/hooks/useColorScheme';
import "../global.css";
export default function RootLayout() {
  useFrameworkReady();
  const scheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <CartProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="restaurant/[id]" />
          <Stack.Screen name="cart" />
          <Stack.Screen name="order-success" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
      </CartProvider>
    </GestureHandlerRootView>
  );
}
