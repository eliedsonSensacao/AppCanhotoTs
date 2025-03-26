import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PermissionProvider } from '@/src/Context/permissionContext';
import { NotasProvider } from '@/src/Context/notaContext';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView>
      <PermissionProvider>
        <NotasProvider>
          <Tabs
            screenOptions={{
              tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
              headerShown: false,
              tabBarStyle: Platform.select({
                ios: {
                  position: 'absolute',
                },
                default: {},
              }),
            }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Home',
                tabBarItemStyle: { display: 'none' }
              }}
            />
            <Tabs.Screen
              name="form"
              options={{
                title: 'Envio de Notas',
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="upload" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="table"
              options={{
                title: 'Enviados',
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="table" size={size} color={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="configuration"
              options={{
                title: 'Configurações',
                tabBarIcon: ({ color, size }) => (
                  <AntDesign name="setting" size={size} color={color} />
                ),
              }}
            />

            <Tabs.Screen
              name="barcodeScanner"
              options={{
                title: 'BarCodeScanner',
                tabBarStyle: { display: 'none' },
                tabBarItemStyle: { display: 'none' }
              }}
            />
            <Tabs.Screen
              name="imagePicker"
              options={{
                title: 'imagePicker',
                tabBarStyle: { display: 'none' },
                tabBarItemStyle: { display: 'none' }
              }}
            />
          </Tabs>
        </NotasProvider>
      </PermissionProvider>
    </GestureHandlerRootView>
  );
}
