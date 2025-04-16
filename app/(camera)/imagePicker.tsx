import { CameraCapturedPicture, CameraView } from 'expo-camera';
import React, { useContext, useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useNotasContext } from '@/src/Context/notaContext';
import { ShotButton } from '@/src/components/screenComponents/Camera/Buttons/shotButton';
import { PermissionContext } from '@/src/Context/permissionContext';
import { ComponentCameraView } from '@/src/components/screenComponents/Camera/cameraView';
import Toast from 'react-native-toast-message';

export default function PickupImage() {
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const { salvarUriNota } = useNotasContext();

    const { cameraPermission } = useContext(PermissionContext)!;

    useEffect(() => {
        const checkPermissions = async () => {
            const { cameraPermission, requestCameraPermission } = useContext(PermissionContext)!;
            if (!cameraPermission) {
                const response = await requestCameraPermission();
                if (!response?.granted) {
                    Toast.show({ type: 'error', text1: 'Permissão não concedida' })
                    navigation.back();
                }
            }
        };
        checkPermissions();
    }, [cameraPermission]);

    const takePicture = React.useCallback(async () => {
        try {
            if (cameraRef.current) {
                const photo: CameraCapturedPicture | undefined = await cameraRef.current.takePictureAsync();
                if (photo && photo.uri) {
                    salvarUriNota(photo.uri);
                    if (cameraRef.current) {
                        cameraRef.current.pausePreview();
                    }
                    navigation.replace('/(tabs)/form');
                } else {
                    throw new Error('Failed to capture photo');
                }
            }
        } catch (err: any) {
            Toast.show({ type: 'error', text1: 'Erro:', text2: err.message })
        }
    }, [cameraRef, navigation, salvarUriNota]);


    return (
        <View style={styles.container}>
            <ComponentCameraView ref={cameraRef} />
            <ShotButton onPress={takePicture} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
