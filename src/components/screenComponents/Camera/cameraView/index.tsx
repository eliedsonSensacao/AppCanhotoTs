import { BarcodeScanningResult, CameraView } from "expo-camera";
import { forwardRef } from "react";
import { StyleSheet } from "react-native";

type CameraViewProps = {
    onBarCodeScanned?: (result: BarcodeScanningResult) => void;
}

export const ComponentCameraView = forwardRef<CameraView, CameraViewProps>(
    ({ onBarCodeScanned }, ref) => {
        return (
            <CameraView
                ref={ref}
                style={styles.camView}
                zoom={0}
                autofocus="on"
                barcodeScannerSettings={{
                    barcodeTypes: ['code128'],
                }}
                pictureSize="1920x1080"
                onBarcodeScanned={onBarCodeScanned}
            />
        );
    }
);

const styles = StyleSheet.create({
    camView: {
        flexGrow: 1,
    },
})