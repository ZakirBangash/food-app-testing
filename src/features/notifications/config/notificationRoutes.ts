/**
 * Configuration for notification routes
 * This helps maintain consistency in navigation paths for notifications
 */
export const NOTIFICATION_ROUTES = {
  // Auth related
  AUTH: {
    LOGIN: '/(auth)/login',
    REGISTER: '/(auth)/register',
  },
  
  // Main app tabs
  TABS: {
    HOME: '/(tabs)/home',
    ORDERS: '/(tabs)/orders',
    PROFILE: '/(tabs)/profile',
  },
  
  // Order related
  ORDERS: {
    LIST: '/(tabs)/orders',
    DETAILS: (orderId: string) => `/(tabs)/orders/${orderId}`,
  },
  
  // Promotions
  PROMOTIONS: {
    LIST: '/(tabs)/promotions',
    DETAILS: (promoId: string) => `/(tabs)/promotions/${promoId}`,
  },
  
  // Settings
  SETTINGS: {
    MAIN: '/(tabs)/settings',
    NOTIFICATIONS: '/(tabs)/settings/notifications',
  },
} as const;

/**
 * Type for notification route keys
 */
export type NotificationRouteKey = keyof typeof NOTIFICATION_ROUTES;

/**
 * Helper to get the correct route for a notification
 * @param routeKey - The key of the route to use
 * @param params - Optional parameters for the route
 */
export function getNotificationRoute(routeKey: string, params?: Record<string, string>): string {
  const route = routeKey.split('.').reduce((obj, key) => obj?.[key], NOTIFICATION_ROUTES as any);
  
  if (typeof route === 'function' && params) {
    return route(params.id);
  }
  
  return route || '/(tabs)/home'; // Default to home if route not found
} 