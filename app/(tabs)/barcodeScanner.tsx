import { BarcodeScanningResult, CameraView } from 'expo-camera';
import { useNotasContext } from "@/src/Context/notaContext";
import { useEffect, useRef } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { useRouter } from 'expo-router';
import HandlePermissions from '@/src/functions/permissionsHandlers';
import { filterCodeBar } from '@/src/functions/Camera/scripts/barCodeFilter';

export default function BarcodeScanner() {
    const cameraRef = useRef<CameraView>(null);
    const navigation = useRouter();
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

    const { salvarDadosNota } = useNotasContext()

    const handleBarCodeScanned = async ({ data }: BarcodeScanningResult) => {
        try {
            const codeBarData = await filterCodeBar(data);
            console.log(codeBarData)
            salvarDadosNota(codeBarData.filteredCnpj, codeBarData.filteredSerie, codeBarData.filteredNota);
        } catch (err: any) {
            Alert.alert("Erro", err.message)
        } finally {
            navigation.navigate('/(tabs)/form')
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                ratio='4:3'
                barcodeScannerSettings={{
                    barcodeTypes: ['code128'],
                }}

                onBarcodeScanned={handleBarCodeScanned}
            >
                <View style={styles.leftContainer} />
                <View style={styles.rightContainer} />
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
    },
    leftContainer: {
        flexDirection: 'column',
        maxHeight: '40%',
        flex: 1,
        backgroundColor: '#00000080',
    },
    rightContainer: {
        justifyContent: 'flex-end',
        display: 'flex',
        marginTop: '40%',
        maxHeight: '40%',
        flex: 1,
        backgroundColor: '#00000080',
    },
}
)