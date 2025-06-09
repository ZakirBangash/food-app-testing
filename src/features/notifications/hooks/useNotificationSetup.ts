import { useEffect, useRef } from "react";
import * as Notifications from "expo-notifications";
import { useRouter } from 'expo-router';
import { registerForPushNotificationsAsync } from '../utils/notificationUtils';
import { useNotificationStore } from '../store/notificationStore';
import { getNotificationRoute } from '../config/notificationRoutes';

/**
 * Hook to set up notification listeners
 * Should be used in the app's root component
 */
export const useNotificationSetup = () => {
  const { 
    setExpoPushToken, 
    setNotification, 
    setNotificationResponse, 
    setError 
  } = useNotificationStore();
  const router = useRouter();

  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync()
      .then((token) => setExpoPushToken(token || null))
      .catch((error) => setError(error));

    // Set up notification received listener
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log("🔔 Notification Received: ", notification);
      setNotification(notification);
    });

    // Set up notification response listener
    responseListener.current = Notifications.addNotificationResponseReceivedListener((response) => {
      console.log("🔔 Notification Response: ", JSON.stringify(response, null, 2));
      setNotificationResponse(response);

      // Handle navigation when notification is tapped
      const data = response.notification.request.content.data;
      if (data?.routeKey && typeof data.routeKey === 'string') {
        const params = data.params as Record<string, string> | undefined;
        const route = getNotificationRoute(data.routeKey, params);
        router.push(route as any); // Type assertion needed due to expo-router's strict typing
      }
    });

    // Clean up listeners
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, [router]);
}; 