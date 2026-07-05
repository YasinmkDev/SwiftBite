export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  imageUrl: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: number;
  minOrder: number;
  distance: string;
  isOpen: boolean;
  isFeatured: boolean;
  tags: string[];
  address: string;
  description: string;
}

export interface MenuCategory {
  id: string;
  name: string;
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  isPopular: boolean;
  isVegetarian: boolean;
  calories?: number;
  allergens?: string[];
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  restaurantId: string;
  restaurantName: string;
}

export interface Cart {
  items: CartItem[];
  restaurantId: string | null;
  restaurantName: string | null;
}

export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  restaurantName: string;
  restaurantImageUrl: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryFee: number;
  placedAt: string;
  estimatedDelivery: string;
  address: string;
}

export interface Review {
  id: string;
  restaurantId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Address {
  id: string;
  label: string;
  fullAddress: string;
  isDefault: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarUrl: string;
  totalOrders: number;
  totalReviews: number;
  savedRestaurants: number;
  addresses: Address[];
}

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'success' | 'warning' | 'error' | 'info';

export type RootStackParamList = {
  '(auth)/welcome': undefined;
  '(auth)/login': undefined;
  '(auth)/signup': undefined;
  '(tabs)': undefined;
  'restaurant/[id]': { id: string };
  cart: undefined;
  'order-success': undefined;
};
