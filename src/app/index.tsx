import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../store/auth';
import { ActivityIndicator } from 'react-native';

export default function Index() {
  const { user, isLoading, initialize } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    // initialize();
  }, []);

  useEffect(() => {
    if (false) return;

    if (!user) {
      router.replace('../(auth)/login');
    } else {
      router.replace('../(onboarding)/welcome');
    }
  }, [user, isLoading]);

  return <ActivityIndicator size="large" color="#0000ff" />;
} 