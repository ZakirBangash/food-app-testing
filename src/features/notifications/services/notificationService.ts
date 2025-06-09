import { 
  scheduleImmediateNotification, 
  scheduleDelayedNotification,
  scheduleDateNotification,
} from '../utils/notificationUtils';
import { NotificationContent } from '../types';

/**
 * Send an order status update notification
 * @param orderId - The ID of the order
 * @param status - The new status of the order
 */
export const sendOrderStatusNotification = async (
  orderId: string, 
  status: string
): Promise<void> => {
  const content: NotificationContent = {
    title: 'Order Update',
    body: `Your order #${orderId} is now ${status}`,
    data: {
      screen: '/(tabs)/orders',
      orderId,
      status,
    },
  };

  await scheduleImmediateNotification(content);
};

/**
 * Send a reminder notification
 * @param title - The title of the reminder
 * @param message - The reminder message
 * @param delayInSeconds - Delay before showing the notification
 */
export const sendReminderNotification = async (
  title: string,
  message: string,
  delayInSeconds: number
): Promise<void> => {
  const content: NotificationContent = {
    title,
    body: message,
    data: {
      screen: '/(tabs)/home',
    },
  };

  await scheduleDelayedNotification(content, delayInSeconds);
};

/**
 * Send a custom notification
 * @param content - The notification content
 * @param delayInSeconds - Optional delay before showing the notification
 */
export const sendCustomNotification = async (
  content: NotificationContent,
  delayInSeconds?: number
): Promise<void> => {
  if (delayInSeconds) {
    await scheduleDelayedNotification(content, delayInSeconds);
  } else {
    await scheduleImmediateNotification(content);
  }
};

/**
 * Send a notification for a specific date
 * @param content - The notification content
 * @param date - The date to show the notification
 */
export const sendScheduledNotification = async (
  content: NotificationContent,
  date: Date
): Promise<void> => {
  await scheduleDateNotification(content, date);
}; 