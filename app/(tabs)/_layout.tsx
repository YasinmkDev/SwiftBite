import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/hooks/useTheme';
import { useCartContext } from '@/context/CartContext';
import { View, Text } from 'react-native';

type IoniconName = keyof typeof Ionicons.glyphMap;

interface TabIconProps {
  name: IoniconName;
  activeName: IoniconName;
  focused: boolean;
  color: string;
  size: number;
  badge?: number;
}

function TabIcon({ name, activeName, focused, color, size, badge }: TabIconProps) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={focused ? activeName : name} size={size} color={color} />
      {badge !== undefined && badge > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -4,
            right: -8,
            backgroundColor: '#FF6B35',
            minWidth: 16,
            height: 16,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 2,
          }}
        >
          <Text style={{ color: '#fff', fontSize: 9, fontWeight: '800' }}>{badge}</Text>
        </View>
      )}
    </View>
  );
}

export default function TabsLayout() {
  const { colors } = useTheme();
  const { totalItems } = useCartContext();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.tabBarActive,
        tabBarInactiveTintColor: colors.tabBarInactive,
        tabBarStyle: {
          backgroundColor: colors.tabBarBg,
          borderTopColor: colors.borderLight,
          borderTopWidth: 1,
          height: 62,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="home-outline" activeName="home" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="search-outline" activeName="search" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="receipt-outline" activeName="receipt" focused={focused} color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon name="person-outline" activeName="person" focused={focused} color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
