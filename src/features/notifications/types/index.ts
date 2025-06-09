import * as Notifications from 'expo-notifications';

/**
 * Base notification data interface
 */
export interface NotificationData {
  /** Screen to navigate to when notification is tapped */
  screen?: string;
  /** Order ID for order-related notifications */
  orderId?: string;
  /** Status for order-related notifications */
  status?: string;
  /** Allow additional string properties */
  [key: string]: string | undefined;
}

/**
 * Notification content interface
 */
export interface NotificationContent {
  /** Title of the notification */
  title: string;
  /** Body text of the notification */
  body: string;
  /** Additional data to pass with the notification */
  data?: NotificationData;
}

/**
 * Notification trigger types
 */
export type NotificationTrigger = 
  | { type: 'timeInterval'; seconds: number }
  | { type: 'date'; date: Date }
  | null;

/**
 * Notification channel configuration for Android
 */
export interface NotificationChannelConfig {
  name: string;
  importance: Notifications.AndroidImportance;
  vibrationPattern?: number[];
  lightColor?: string;
  sound?: string;
  enableVibrate?: boolean;
  enableLights?: boolean;
} 