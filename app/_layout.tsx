import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme } from '@/hooks/useColorScheme';
import { NotasProvider } from '@/src/Context/notaContext';
import { LoadingProvider, useLoading } from '@/src/Context/loadingContext';
import Toast from 'react-native-toast-message';

SplashScreen.preventAutoHideAsync();

function AppContent() {
  const colorScheme = useColorScheme();
  const { isLoading } = useLoading();

  return (

    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NotasProvider>
          <Stack initialRouteName="(tabs)">
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(camera)" options={{ headerShown: false }} />
            <Stack.Screen name="+not-found" />
          </Stack>
          <Toast />
          {isLoading && (
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
            </View>
          )}
          <StatusBar hidden />
        </NotasProvider>
      </GestureHandlerRootView>

    </ThemeProvider>
  );
}

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) return null;

  return (
    <LoadingProvider>
      <AppContent />
    </LoadingProvider>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 999,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
