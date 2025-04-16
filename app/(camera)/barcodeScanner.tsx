import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { useNotasContext } from "@/src/Context/notaContext";
import { useContext, useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { filterCodeBar } from '@/src/functions/Camera/scripts/barCodeFilter';
import { PermissionContext } from '@/src/Context/permissionContext';
import { ComponentCameraView } from '@/src/components/screenComponents/Camera/cameraView';

export default function BarcodeScanner() {
    const { salvarDadosNota } = useNotasContext()
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
    const { cameraPermission } = useContext(PermissionContext)!;

    useEffect(() => {
        const checkPermissions = async () => {
            const { cameraPermission, requestCameraPermission } = useContext(PermissionContext)!;
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

    const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
        try {
            const codeBarData = await filterCodeBar(data);
            salvarDadosNota(codeBarData.filteredCnpj, codeBarData.filteredSerie, codeBarData.filteredNota);
        } catch (err) {
            if (err instanceof Error) {
                Alert.alert("Erro", err.message)
            } else[
                Alert.alert("Erro", "Erro desconhecido")
            ]
        } finally {
            if (cameraRef.current)
                cameraRef.current.pausePreview()
            navigation.back();

        }
    };

    return (
        <View style={styles.container}>
            <ComponentCameraView ref={cameraRef} onBarCodeScanned={handleBarCodeScanned} />
            <View style={styles.overlay}>
                <View style={styles.maskTop} />
                <View style={styles.middleRow}>
                    <View style={styles.maskSide} />
                    <View style={styles.scanArea} />
                    <View style={styles.maskSide} />
                </View>
                <View style={styles.maskBottom} />
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    maskTop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    middleRow: {
        flexDirection: 'row',
        height: '20%',
    },
    maskSide: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    scanArea: {
        width: '80%',
        borderColor: '#ffee00',
        borderWidth: 4,
        borderRadius: 2,
        backgroundColor: 'transparent',
    },
    maskBottom: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
});