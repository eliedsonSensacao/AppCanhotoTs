import { CameraView } from 'expo-camera';
import { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import ShotButton from '@/src/components/CameraComponents/Buttons/shotButton';
import HandlePermissions from '@/src/functions/permissionsHandlers';

export default function PickupImage() {
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const checkPermissions = HandlePermissions();

    useEffect(() => {
        const verifyPermissions = async () => {
            const hasPermissions = await checkPermissions();
            if (!hasPermissions) {
                navigation.navigate('/(tabs)/form');
            }
        };
        verifyPermissions();
    }, [checkPermissions, navigation]);

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                zoom={0}
            >
                <ShotButton cameraRef={cameraRef} />
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
