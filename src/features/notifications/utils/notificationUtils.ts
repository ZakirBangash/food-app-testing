import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { NotificationContent, NotificationTrigger, NotificationChannelConfig } from '../types';

/**
 * Configure how notifications appear when the app is in foreground
 */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Default notification channel configuration for Android
 */
const DEFAULT_CHANNEL_CONFIG: NotificationChannelConfig = {
  name: 'default',
  importance: Notifications.AndroidImportance.MAX,
  vibrationPattern: [0, 250, 250, 250],
  lightColor: '#FF231F7C',
  enableVibrate: true,
  enableLights: true,
};

/**
 * Register for push notifications and return the token
 * @returns {Promise<string | undefined>} Push notification token
 */
export async function registerForPushNotificationsAsync(): Promise<string | undefined> {
  try {
    let token: string | undefined;

    // Set up notification channel for Android
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', DEFAULT_CHANNEL_CONFIG);
    }

    // Check if running on a physical device
    if (!Device.isDevice) {
      console.log('Must use physical device for Push Notifications');
      return;
    }

    // Check existing permissions
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    // Request permissions if not granted
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    // Return if permissions not granted
    if (finalStatus !== 'granted') {
      console.log('Failed to get push token for push notification!');
      return;
    }

    // Get the token that uniquely identifies this device
    try {
      token = (await Notifications.getExpoPushTokenAsync({
        projectId: 'cfe6d594-2efa-46b9-b070-0011a12a597c' // Your Expo project ID
      })).data;
    } catch (error) {
      console.error('Error getting push token:', error);
    }

    return token;
  } catch (error) {
    console.error('Error in registerForPushNotificationsAsync:', error);
    return undefined;
  }
}

/**
 * Schedule a notification with the given content and trigger
 * @param content - Notification content
 * @param trigger - When to show the notification
 */
export async function scheduleNotification(
  content: NotificationContent,
  trigger: NotificationTrigger = null
): Promise<void> {
  const notificationTrigger = trigger === null ? null : 
    trigger.type === 'timeInterval' 
      ? { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: trigger.seconds } as Notifications.TimeIntervalTriggerInput
      : { type: Notifications.SchedulableTriggerInputTypes.DATE, date: trigger.date } as Notifications.DateTriggerInput;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: content.title,
      body: content.body,
      data: content.data || {},
    },
    trigger: notificationTrigger,
  });
}

/**
 * Schedule an immediate notification
 * @param content - Notification content
 */
export async function scheduleImmediateNotification(content: NotificationContent): Promise<void> {
  await scheduleNotification(content, null);
}

/**
 * Schedule a delayed notification
 * @param content - Notification content
 * @param seconds - Delay in seconds
 */
export async function scheduleDelayedNotification(
  content: NotificationContent,
  seconds: number
): Promise<void> {
  await scheduleNotification(content, { type: 'timeInterval', seconds });
}

/**
 * Schedule a notification for a specific date
 * @param content - Notification content
 * @param date - Date to show the notification
 */
export async function scheduleDateNotification(
  content: NotificationContent,
  date: Date
): Promise<void> {
  await scheduleNotification(content, { type: 'date', date });
} 