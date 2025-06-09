import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuthStore } from '../store/auth';
import { useDeepLinking } from '@/hooks/useDeepLinking';
import { useNotificationSetup } from '@/features/notifications/hooks/useNotificationSetup';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Stack screen options
const stackScreenOptions = {
  auth: {
    headerShown: false,
  },
  onboarding: {
    headerShown: false,
  },
  tabs: {
    headerShown: false,
  },
  modal: {
    presentation: "modal",
  },
} as const;

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

/**
 * Root layout component that handles app initialization
 */
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Initialize core app features
  useNotificationSetup();
  useDeepLinking();

  // Handle font loading errors
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  // Hide splash screen when fonts are loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

/**
 * Navigation layout component that handles routing and theme
 */
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore();

  // Handle initial navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/(auth)/register");
    } else if (pathname === '/') {
      router.replace('/welcome');
    }
  }, [user, isLoading, pathname, router]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(auth)" 
          options={stackScreenOptions.auth}
        />
        <Stack.Screen 
          name="(onboarding)" 
          options={stackScreenOptions.onboarding}
        />
        <Stack.Screen 
          name="(tabs)" 
          options={stackScreenOptions.tabs}
        />
        <Stack.Screen 
          name="modal" 
          options={stackScreenOptions.modal}
        />
      </Stack>
    </ThemeProvider>
  );
}
