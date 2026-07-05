import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useTheme } from '@/hooks/useTheme';

export default function SignupScreen() {
  const router = useRouter();
  const { colors } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    if (!email.includes('@')) newErrors.email = 'Please enter a valid email address';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreedToTerms) newErrors.terms = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignup = async () => {
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
            Create account
          </Text>
          <Text style={{ fontSize: 15, color: colors.textSecondary, marginBottom: 32 }}>
            Join SwiftBite and discover great food
          </Text>

          <View style={{ gap: 16, marginBottom: 24 }}>
            <Input
              label="Full name"
              placeholder="John Doe"
              value={name}
              onChangeText={setName}
              icon="person-outline"
              autoCapitalize="words"
              error={errors.name}
            />
            <Input
              label="Email address"
              placeholder="you@example.com"
              value={email}
              onChangeText={setEmail}
              icon="mail-outline"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
            />
            <Input
              label="Password"
              placeholder="Min. 6 characters"
              value={password}
              onChangeText={setPassword}
              icon="lock-closed-outline"
              secure
              error={errors.password}
            />
            <Input
              label="Confirm password"
              placeholder="Repeat password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              icon="lock-closed-outline"
              secure
              error={errors.confirmPassword}
            />
          </View>

          <TouchableOpacity
            onPress={() => setAgreedToTerms((v) => !v)}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 28 }}
          >
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: 6,
                borderWidth: 2,
                borderColor: agreedToTerms ? colors.accent : colors.border,
                backgroundColor: agreedToTerms ? colors.accent : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {agreedToTerms && <Ionicons name="checkmark" size={13} color="#fff" />}
            </View>
            <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 3 }}>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>I agree to the</Text>
              <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '600' }}>Terms of Service</Text>
              <Text style={{ color: colors.textSecondary, fontSize: 13 }}>and</Text>
              <Text style={{ color: colors.accent, fontSize: 13, fontWeight: '600' }}>Privacy Policy</Text>
            </View>
          </TouchableOpacity>
          {errors.terms && (
            <Text style={{ color: colors.error, fontSize: 12, marginTop: -18, marginBottom: 18 }}>{errors.terms}</Text>
          )}

          <Button
            label="Create Account"
            onPress={handleSignup}
            variant="primary"
            size="lg"
            fullWidth
            loading={loading}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 4, marginTop: 24, marginBottom: 16 }}>
            <Text style={{ color: colors.textSecondary, fontSize: 14 }}>Already have an account?</Text>
            <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
              <Text style={{ color: colors.accent, fontSize: 14, fontWeight: '700' }}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
