import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

export default function LoginScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let valid = true;
    if (!email.includes('@')) {
      setEmailError('Please enter a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }
    return valid;
  };

  const handleLogin = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingTop: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              backgroundColor: colors.bgSecondary,
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 32,
            }}
          >
            <Ionicons name="arrow-back" size={20} color={colors.textPrimary} />
          </TouchableOpacity>

          <Text style={{ fontSize: 30, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 }}>
            Welcome back
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 36 }}>
            Sign in to continue your food journey
          </Text>

          <View style={{ gap: 16, marginBottom: 24 }}>
            <Input
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              error={emailError}
            />
            <Input
              label="Password"
              placeholder="Your password"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              secure
              error={passwordError}
            />
          </View>

          <TouchableOpacity style={{ alignSelf: 'flex-end', marginBottom: 28 }}>
            <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '600' }}>Forgot password?</Text>
          </TouchableOpacity>

          <Button
            label="Sign In"
            onPress={handleLogin}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          />

          <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
            <Text style={{ marginHorizontal: 12, color: colors.textTertiary, fontSize: 13 }}>or continue with</Text>
            <View style={{ flex: 1, height: 1, backgroundColor: colors.border }} />
          </View>

          <View style={{ flexDirection: 'row', gap: 12, marginBottom: 32 }}>
            <SocialButton icon="logo-google" label="Google" colors={colors} />
            <SocialButton icon="logo-apple" label="Apple" colors={colors} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Don't have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/signup')}>
              <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '700' }}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface SocialButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  colors: ReturnType<typeof useTheme>['colors'];
}

function SocialButton({ icon, label, colors }: SocialButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        paddingVertical: 13,
        borderRadius: 12,
        backgroundColor: colors.bgSecondary,
        borderWidth: 1,
        borderColor: colors.border,
      }}
    >
      <Ionicons name={icon} size={18} color={colors.textPrimary} />
      <Text style={{ color: colors.textPrimary, fontSize: 14, fontWeight: '600' }}>{label}</Text>
    </TouchableOpacity>
  );
}
