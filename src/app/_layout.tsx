import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter, usePathname } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import React from 'react';
import 'react-native-reanimated';
import * as Linking from 'expo-linking';

import { useColorScheme } from '@/components/useColorScheme';
import { useAuthStore } from '../store/auth';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

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

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuthStore();

  useEffect(() => {
    // Handle deep links when the app is already open
    const subscription = Linking.addEventListener('url', (event) => {
      const { hostname, path, queryParams } = Linking.parse(event.url);
      console.log('Deep link received:', { hostname, path, queryParams });
      
      // Handle the deep link based on the path
      if (path && typeof path === 'string') {
        // Remove any leading slashes and ensure the path is valid
        const cleanPath = path.replace(/^\/+/, '');
        if (cleanPath) {
          // Compare current pathname with target path
          if (pathname !== `/${cleanPath}`) {
            router.replace(cleanPath as any);
          }
        }
      }
    });

    // Handle deep links when the app is opened from a closed state
    Linking.getInitialURL().then((url) => {
      if (url) {
        const { hostname, path, queryParams } = Linking.parse(url);
        console.log('Initial deep link:', { hostname, path, queryParams });
        
        if (path && typeof path === 'string') {
          // Remove any leading slashes and ensure the path is valid
          const cleanPath = path.replace(/^\/+/, '');
          if (cleanPath) {
            router.replace(cleanPath as any);
          }
        }
      }
    });

    return () => {
      subscription.remove();
    };
  }, [router, pathname]);

  // Handle initial navigation based on auth state
  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace('/(auth)/login');
    } else if (pathname === '/') {
      // Only redirect to onboarding if we're at the root
      router.replace('/(onboarding)/welcome');
    }
  }, [user, isLoading, pathname]);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen 
          name="(auth)" 
          options={{ 
            headerShown: false, 
            animation: "fade",
            gestureEnabled: false,
            gestureDirection: "horizontal",
            fullScreenGestureEnabled: false
          }} 
        />
        <Stack.Screen 
          name="(onboarding)" 
          options={{ 
            headerShown: false,
            gestureEnabled: false,
            gestureDirection: "horizontal",
            fullScreenGestureEnabled: false
          }} 
        />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
    </ThemeProvider>
  );
}
