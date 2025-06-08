import { useEffect } from 'react';
import * as Linking from 'expo-linking';
import { useRouter, usePathname } from 'expo-router';

interface DeepLinkParams {
  hostname: string | null;
  path: string | null;
  queryParams: Record<string, string> | null;
}

export const useDeepLinking = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleDeepLink = (url: string) => {
    const { hostname, path, queryParams } = Linking.parse(url) as DeepLinkParams;
    console.log('Deep link received:', { hostname, path, queryParams });
    
    // Only handle external deep links (those with a hostname)
    if (hostname && path && typeof path === 'string') {
      const cleanPath = path.replace(/^\/+/, '');
      if (cleanPath && pathname !== `/${cleanPath}`) {
        router.replace(cleanPath as any);
      }
    }
  };

  useEffect(() => {
    // Handle deep links when the app is already open
    const subscription = Linking.addEventListener('url', (event) => {
      handleDeepLink(event.url);
    });

    // Handle deep links when the app is opened from a closed state
    Linking.getInitialURL().then((url) => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [router, pathname]);
}; 