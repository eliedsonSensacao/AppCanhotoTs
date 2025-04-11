import { Stack } from 'expo-router';
import React from 'react';

export default function StackLayout() {

  return (
    <Stack
      screenOptions={{
        headerShown: false,
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
  );
}
