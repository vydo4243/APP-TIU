import '../global.css';

import { Stack, Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from '@expo-google-fonts/inter';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    // Giả lập kiểm tra login (hoặc gọi AsyncStorage ở đây)
    const checkLogin = async () => {
      // ví dụ: const user = await AsyncStorage.getItem('user');
      setLoggedIn(false); // true nếu đã login
    };

    checkLogin();
  }, []);

  if (!fontsLoaded || loggedIn === null) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4B63B7" />
      </View>
    );
  }

  if (loggedIn) {
    return <Redirect href="/(tabs)/schedule" />;
  }

  return (
    <SafeAreaProvider>
      <View className="flex-1 font-sans">
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </SafeAreaProvider>
  );
}
