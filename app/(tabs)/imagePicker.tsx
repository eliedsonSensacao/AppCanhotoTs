import { CameraCapturedPicture, CameraView } from 'expo-camera';
import React, { useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import HandlePermissions from '@/src/functions/permissionsHandlers';
import { useNotasContext } from '@/src/Context/notaContext';
import { ShotButton } from '@/src/components/CameraComponents/Buttons/shotButton';

export default function PickupImage() {
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const { salvarUriNota } = useNotasContext();

    useEffect(() => {

        const verifyPermissions = async () => {
            const hasPermissions = HandlePermissions();
            do {
                if (!hasPermissions) {
                    navigation.navigate('/(tabs)/form');
                }
            } while (!hasPermissions)

        };
        verifyPermissions();
    }, []);

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
        justifyContent: 'center',
        backgroundColor: '#000'
    },
    camera: {
        flex: 1,
        flexDirection: 'row',
    }
});
