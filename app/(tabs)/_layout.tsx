import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
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
          href: null
        }}
      />
      <Tabs.Screen
        name="form/index"
        options={{
          title: 'Envio de Notas',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="upload" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="table/index"
        options={{
          title: 'Enviados',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="table" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="config/index"
        options={{
          title: 'Configurações',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="setting" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
