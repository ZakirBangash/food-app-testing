import { create } from 'zustand';
import * as Notifications from 'expo-notifications';

interface NotificationState {
  expoPushToken: string | null;
  notification: Notifications.Notification | null;
  notificationResponse: Notifications.NotificationResponse | null;
  error: Error | null;
  setExpoPushToken: (token: string | null) => void;
  setNotification: (notification: Notifications.Notification | null) => void;
  setNotificationResponse: (response: Notifications.NotificationResponse | null) => void;
  setError: (error: Error | null) => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  expoPushToken: null,
  notification: null,
  notificationResponse: null,
  error: null,
  setExpoPushToken: (token) => set({ expoPushToken: token }),
  setNotification: (notification) => set({ notification }),
  setNotificationResponse: (response) => set({ notificationResponse: response }),
  setError: (error) => set({ error }),
})); 