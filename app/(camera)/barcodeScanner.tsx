import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { useNotasContext } from "@/src/Context/notaContext";
import { useContext, useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import { filterCodeBar } from '@/src/functions/Camera/scripts/barCodeFilter';
import { PermissionContext } from '@/src/Context/permissionContext';

export default function BarcodeScanner() {
    const { salvarDadosNota } = useNotasContext()
    const navigation = useRouter();
    const cameraRef = useRef<CameraView>(null);
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
            navigation.back();
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camView}
                barcodeScannerSettings={{
                    barcodeTypes: ['code128'],
                }}
                onBarcodeScanned={handleBarCodeScanned}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camView: {
        flex: 1,
    }
})