import { CameraCapturedPicture, CameraView } from 'expo-camera';
import React, { useContext, useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { useNotasContext } from '@/src/Context/notaContext';
import { ShotButton } from '@/src/components/CameraComponents/Buttons/shotButton';
import { windowHeight } from '@/src/functions/utils/getScreenDimensions';
import { PermissionContext } from '@/src/Context/permissionContext';

export default function PickupImage() {
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const { salvarUriNota } = useNotasContext();

    const { cameraPermission, requestCameraPermission } = useContext(PermissionContext)!;

    useEffect(() => {
        const checkPermissions = async () => {
            if (!cameraPermission) {
                const response = await requestCameraPermission();
                if (!response?.granted) {
                    Alert.alert("Permissão necessária", "A câmera é necessária para escanear códigos de barras.");
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
            Alert.alert('Erro:', `${err.message}`);
        }
    }, [cameraRef, navigation, salvarUriNota]);


    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                zoom={0}
            >
                <ShotButton onPress={takePicture} />
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: windowHeight(100),
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    camera: {
        flex: 1,
        flexDirection: 'row',
    }
});
