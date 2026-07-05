import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { CartItem } from '@/components/cart/CartItem';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';
import { useCartContext } from '@/context/CartContext';

const DELIVERY_FEE = 1.99;
const TAX_RATE = 0.08;

export default function CartScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const { cart, addItem, removeItem, decrementItem, subtotal, totalItems, clearCart } = useCartContext();
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  const discount = promoApplied ? subtotal * 0.1 : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + DELIVERY_FEE + tax;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === 'SWIFT10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code');
      setPromoApplied(false);
    }
  };

  const handlePlaceOrder = () => {
    clearCart();
    router.push('/order-success');
  };

  if (cart.items.length === 0) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: colors.borderLight }}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
          <Text style={{ fontSize: 20, fontWeight: '800', color: colors.textPrimary }}>Your Cart</Text>
        </View>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
          <Ionicons name="bag-outline" size={72} color={colors.textTertiary} />
          <Text style={{ color: colors.textPrimary, fontSize: 22, fontWeight: '700', marginTop: 20, textAlign: 'center' }}>
            Your cart is empty
          </Text>
          <Text style={{ color: colors.textTertiary, fontSize: 14, marginTop: 8, textAlign: 'center', lineHeight: 20 }}>
            Add items from a restaurant to get started
          </Text>
          <Button
            label="Browse Restaurants"
            onPress={() => router.replace('/(tabs)')}
            variant="primary"
            size="md"
            style={{ marginTop: 28 }}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      {/* Header */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          paddingHorizontal: 20,
          paddingVertical: 16,
          borderBottomWidth: 1,
          borderBottomColor: colors.borderLight,
        }}
      >
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={colors.textPrimary} />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '800', color: colors.textPrimary, flex: 1 }}>Your Cart</Text>
        <TouchableOpacity onPress={clearCart}>
          <Text style={{ color: colors.error, fontSize: 13, fontWeight: '600' }}>Clear</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
        {/* Restaurant Name */}
        {cart.restaurantName && (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 14 }}>
            <Ionicons name="restaurant-outline" size={14} color={colors.textTertiary} />
            <Text style={{ fontSize: 13, color: colors.textTertiary }}>
              From <Text style={{ fontWeight: '700', color: colors.textSecondary }}>{cart.restaurantName}</Text>
            </Text>
          </View>
        )}

        {/* Cart Items */}
        {cart.items.map((item) => (
          <CartItem
            key={item.menuItem.id}
            item={item}
            onAdd={() => addItem(item.menuItem, item.restaurantId, item.restaurantName)}
            onDecrement={() => decrementItem(item.menuItem.id)}
            onRemove={() => removeItem(item.menuItem.id)}
          />
        ))}

        {/* Promo Code */}
        <View
          style={{
            backgroundColor: colors.bgSecondary,
            borderRadius: 14,
            padding: 14,
            marginTop: 8,
            marginBottom: 16,
            borderWidth: 1,
            borderColor: promoApplied ? `${colors.success}50` : colors.border,
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textPrimary, marginBottom: 10 }}>
            Promo Code
          </Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <TextInput
              value={promoCode}
              onChangeText={(t) => { setPromoCode(t.toUpperCase()); setPromoError(''); }}
              placeholder="Enter code (try SWIFT10)"
              placeholderTextColor={colors.textTertiary}
              style={{
                flex: 1,
                backgroundColor: colors.bgCard,
                borderRadius: 10,
                paddingHorizontal: 12,
                paddingVertical: 10,
                fontSize: 14,
                color: colors.textPrimary,
                borderWidth: 1,
                borderColor: colors.border,
                fontFamily: 'monospace',
              }}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              onPress={handleApplyPromo}
              style={{
                backgroundColor: colors.accent,
                borderRadius: 10,
                paddingHorizontal: 16,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Apply</Text>
            </TouchableOpacity>
          </View>
          {promoApplied && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 8 }}>
              <Ionicons name="checkmark-circle" size={14} color={colors.success} />
              <Text style={{ color: colors.success, fontSize: 12, fontWeight: '600' }}>10% discount applied!</Text>
            </View>
          )}
          {promoError && (
            <Text style={{ color: colors.error, fontSize: 12, marginTop: 6 }}>{promoError}</Text>
          )}
        </View>

        {/* Price Breakdown */}
        <View
          style={{
            backgroundColor: colors.bgCard,
            borderRadius: 16,
            padding: 16,
            gap: 10,
            borderWidth: isDark ? 0 : 1,
            borderColor: colors.borderLight,
          }}
        >
          <Text style={{ fontSize: 15, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 }}>
            Order Summary
          </Text>
          <PriceRow label="Subtotal" value={`$${subtotal.toFixed(2)}`} colors={colors} />
          {promoApplied && (
            <PriceRow label="Promo (SWIFT10)" value={`-$${discount.toFixed(2)}`} colors={colors} valueColor={colors.success} />
          )}
          <PriceRow label="Delivery fee" value={`$${DELIVERY_FEE.toFixed(2)}`} colors={colors} />
          <PriceRow label="Tax (8%)" value={`$${tax.toFixed(2)}`} colors={colors} />
          <View style={{ height: 1, backgroundColor: colors.border, marginVertical: 4 }} />
          <PriceRow label="Total" value={`$${total.toFixed(2)}`} colors={colors} isBold />
        </View>

        {/* Delivery Info */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 12,
            backgroundColor: `${colors.info}12`,
            borderRadius: 12,
            padding: 12,
            marginTop: 16,
          }}
        >
          <Ionicons name="location-outline" size={18} color={colors.info} />
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '700', color: colors.info }}>Delivering to</Text>
            <Text style={{ fontSize: 12, color: colors.textSecondary, marginTop: 1 }}>
              14 Maple Street, Apt 3B
            </Text>
          </View>
          <TouchableOpacity>
            <Text style={{ fontSize: 12, color: colors.accent, fontWeight: '600' }}>Change</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      {/* Place Order CTA */}
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 16,
          paddingBottom: 28,
          backgroundColor: colors.bg,
          borderTopWidth: 1,
          borderTopColor: colors.borderLight,
        }}
      >
        <Button
          label={`Place Order · $${total.toFixed(2)}`}
          onPress={handlePlaceOrder}
          variant="primary"
          size="lg"
          fullWidth
        />
      </View>
    </SafeAreaView>
  );
}

interface PriceRowProps {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>['colors'];
  isBold?: boolean;
  valueColor?: string;
}

function PriceRow({ label, value, colors, isBold, valueColor }: PriceRowProps) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={{ fontSize: isBold ? 16 : 14, fontWeight: isBold ? '700' : '400', color: colors.textSecondary }}>
        {label}
      </Text>
      <Text
        style={{
          fontSize: isBold ? 18 : 14,
          fontWeight: isBold ? '800' : '500',
          color: valueColor ?? (isBold ? colors.textPrimary : colors.textSecondary),
        }}
      >
        {value}
      </Text>
    </View>
  );
}
