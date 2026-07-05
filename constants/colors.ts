export interface ColorPalette {
  // Backgrounds
  bg: string;
  bgSecondary: string;
  bgTertiary: string;
  bgCard: string;
  bgOverlay: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textTertiary: string;
  textInverse: string;

  // Accent
  accent: string;
  accentLight: string;
  accentDark: string;

  // Status
  success: string;
  warning: string;
  error: string;
  info: string;

  // Borders
  border: string;
  borderLight: string;

  // Tab bar
  tabBarBg: string;
  tabBarActive: string;
  tabBarInactive: string;
}

export const COLORS_DARK: ColorPalette = {
  bg: '#0F0F0F',
  bgSecondary: '#1A1A1A',
  bgTertiary: '#252525',
  bgCard: '#1E1E1E',
  bgOverlay: 'rgba(0,0,0,0.7)',

  textPrimary: '#FFFFFF',
  textSecondary: '#AAAAAA',
  textTertiary: '#666666',
  textInverse: '#0F0F0F',

  accent: '#FF6B35',
  accentLight: '#FF8B55',
  accentDark: '#E5522A',

  success: '#4CAF50',
  warning: '#FFC107',
  error: '#F44336',
  info: '#2196F3',

  border: '#2C2C2C',
  borderLight: '#383838',

  tabBarBg: '#1A1A1A',
  tabBarActive: '#FF6B35',
  tabBarInactive: '#555555',
};

export const COLORS_LIGHT: ColorPalette = {
  bg: '#FFFFFF',
  bgSecondary: '#F8F8F8',
  bgTertiary: '#F0F0F0',
  bgCard: '#FFFFFF',
  bgOverlay: 'rgba(0,0,0,0.5)',

  textPrimary: '#111111',
  textSecondary: '#555555',
  textTertiary: '#999999',
  textInverse: '#FFFFFF',

  accent: '#FF6B35',
  accentLight: '#FF8B55',
  accentDark: '#E5522A',

  success: '#388E3C',
  warning: '#F57F17',
  error: '#D32F2F',
  info: '#1565C0',

  border: '#E8E8E8',
  borderLight: '#F0F0F0',

  tabBarBg: '#FFFFFF',
  tabBarActive: '#FF6B35',
  tabBarInactive: '#AAAAAA',
};
