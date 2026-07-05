import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useTheme } from '@/hooks/useTheme';
import { MOCK_USER } from '@/constants/mockData';

interface SettingRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  iconColor?: string;
  isDanger?: boolean;
}

function SettingRow({ icon, label, value, onPress, rightElement, iconColor, isDanger }: SettingRowProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 16,
        gap: 14,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: isDanger ? `${colors.error}18` : colors.bgTertiary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Ionicons
          name={icon}
          size={18}
          color={isDanger ? colors.error : iconColor ?? colors.textSecondary}
        />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '600', color: isDanger ? colors.error : colors.textPrimary }}>
          {label}
        </Text>
        {value && <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 1 }}>{value}</Text>}
      </View>
      {rightElement ?? (
        !isDanger && <Ionicons name="chevron-forward" size={16} color={colors.textTertiary} />
      )}
    </TouchableOpacity>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { colors, isDark } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20, paddingTop: 8, paddingBottom: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: '800', color: colors.textPrimary }}>Profile</Text>
        </View>

        {/* Avatar & Info */}
        <View style={{ alignItems: 'center', paddingVertical: 8, marginBottom: 24 }}>
          <View style={{ position: 'relative', marginBottom: 14 }}>
            <Image
              source={{ uri: MOCK_USER.avatarUrl }}
              style={{ width: 90, height: 90, borderRadius: 45 }}
              resizeMode="cover"
            />
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: colors.accent,
                width: 28,
                height: 28,
                borderRadius: 14,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: colors.bg,
              }}
            >
              <Ionicons name="camera-outline" size={14} color="#fff" />
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 22, fontWeight: '800', color: colors.textPrimary }}>{MOCK_USER.name}</Text>
          <Text style={{ fontSize: 14, color: colors.textTertiary, marginTop: 2 }}>{MOCK_USER.email}</Text>

          {/* Stats Row */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: 20,
              backgroundColor: colors.bgSecondary,
              borderRadius: 16,
              paddingVertical: 16,
              paddingHorizontal: 24,
              gap: 32,
              borderWidth: 1,
              borderColor: colors.border,
            }}
          >
            <StatItem label="Orders" value={String(MOCK_USER.totalOrders)} colors={colors} />
            <View style={{ width: 1, backgroundColor: colors.border }} />
            <StatItem label="Reviews" value={String(MOCK_USER.totalReviews)} colors={colors} />
            <View style={{ width: 1, backgroundColor: colors.border }} />
            <StatItem label="Saved" value={String(MOCK_USER.savedRestaurants)} colors={colors} />
          </View>
        </View>

        {/* Settings Groups */}
        <View style={{ paddingHorizontal: 20, gap: 16 }}>
          {/* Account */}
          <SettingsGroup title="Account" colors={colors}>
            <SettingRow icon="location-outline" label="Saved Addresses" value={`${MOCK_USER.addresses.length} addresses`} onPress={() => {}} />
            <Divider colors={colors} />
            <SettingRow icon="card-outline" label="Payment Methods" value="Visa ending in 4242" onPress={() => {}} />
            <Divider colors={colors} />
            <SettingRow icon="person-outline" label="Edit Profile" onPress={() => {}} />
          </SettingsGroup>

          {/* Preferences */}
          <SettingsGroup title="Preferences" colors={colors}>
            <SettingRow
              icon="notifications-outline"
              label="Push Notifications"
              rightElement={
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: colors.border, true: `${colors.accent}70` }}
                  thumbColor={notificationsEnabled ? colors.accent : colors.textTertiary}
                />
              }
            />
            <Divider colors={colors} />
            <SettingRow icon="moon-outline" label="Dark Mode" value={isDark ? 'Enabled' : 'Disabled'} onPress={() => {}} />
          </SettingsGroup>

          {/* Support */}
          <SettingsGroup title="Support" colors={colors}>
            <SettingRow icon="help-circle-outline" label="Help Center" onPress={() => {}} />
            <Divider colors={colors} />
            <SettingRow icon="document-text-outline" label="Terms of Service" onPress={() => {}} />
            <Divider colors={colors} />
            <SettingRow icon="shield-outline" label="Privacy Policy" onPress={() => {}} />
          </SettingsGroup>

          {/* Logout */}
          <SettingsGroup colors={colors}>
            <SettingRow
              icon="log-out-outline"
              label="Log Out"
              onPress={() => router.replace('/(auth)/welcome')}
              isDanger
            />
          </SettingsGroup>

          <Text style={{ textAlign: 'center', color: colors.textTertiary, fontSize: 12, marginTop: 4, marginBottom: 24 }}>
            SwiftBite v1.0.0
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

interface StatItemProps {
  label: string;
  value: string;
  colors: ReturnType<typeof useTheme>['colors'];
}

function StatItem({ label, value, colors }: StatItemProps) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Text style={{ fontSize: 22, fontWeight: '800', color: colors.accent }}>{value}</Text>
      <Text style={{ fontSize: 12, color: colors.textTertiary, marginTop: 2 }}>{label}</Text>
    </View>
  );
}

interface SettingsGroupProps {
  title?: string;
  children: React.ReactNode;
  colors: ReturnType<typeof useTheme>['colors'];
}

function SettingsGroup({ title, children, colors }: SettingsGroupProps) {
  const { isDark } = useTheme();
  return (
    <View>
      {title && (
        <Text style={{ fontSize: 13, fontWeight: '700', color: colors.textTertiary, marginBottom: 8, textTransform: 'uppercase', letterSpacing: 0.5 }}>
          {title}
        </Text>
      )}
      <View
        style={{
          backgroundColor: colors.bgCard,
          borderRadius: 16,
          overflow: 'hidden',
          borderWidth: isDark ? 0 : 1,
          borderColor: colors.borderLight,
        }}
      >
        {children}
      </View>
    </View>
  );
}

function Divider({ colors }: { colors: ReturnType<typeof useTheme>['colors'] }) {
  return (
    <View style={{ height: 1, backgroundColor: colors.borderLight, marginLeft: 68 }} />
  );
}
