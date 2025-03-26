import { Pressable, StyleSheet } from "react-native";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useRouter } from "expo-router";

export default function BarCodeButton() {
    const router = useRouter();

    return (
        <Pressable style={styles.btnBar} onPress={() => router.push('/(tabs)/barcodeScanner')}>
            <FontAwesome6 name="barcode" size={24} color="black" />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btnBar: {
        backgroundColor: '#CCEDFF',
        height: 50,
        width: '100%',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        alignItems: "center",
        justifyContent: "center",
    }
});
