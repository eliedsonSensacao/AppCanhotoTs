import { PermissionProvider } from '@/src/Context/permissionContext';
import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {

  return (
    <PermissionProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1 }
        }}>
        <Stack.Screen
          name="barcodeScanner"
          options={{
            title: 'BarCodeScanner',
          }}
        />
        <Stack.Screen
          name="imagePicker"
          options={{
            title: 'imagePicker',
          }}
        />
      </Stack>
    </PermissionProvider>
  );
}
