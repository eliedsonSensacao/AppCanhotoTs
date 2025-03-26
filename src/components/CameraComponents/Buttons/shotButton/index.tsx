import { NotasContext, NotasContextType } from '@/src/Context/notaContext';
import { CameraCapturedPicture, CameraView } from 'expo-camera';
import { useRouter } from 'expo-router';
import * as React from 'react'
import { Alert, Pressable, StyleSheet, View } from 'react-native'

interface ShotButtonProps {
    cameraRef: React.RefObject<CameraView>;
}

export default function ShotButton({ cameraRef }: ShotButtonProps) {
    const navigation = useRouter();
    const { salvarUriNota } = React.useContext(NotasContext as React.Context<NotasContextType>);

    const takePicture = React.useCallback(async () => {
        try {
            if (cameraRef.current) {
                const photo: CameraCapturedPicture | undefined = await cameraRef.current.takePictureAsync();
                if (photo && photo.uri) {
                    salvarUriNota(photo.uri);
                    navigation.navigate('/(tabs)/form');
                } else {
                    throw new Error('Failed to capture photo');
                }
            }
        } catch (err: any) {
            Alert.alert('Erro:', `${err.message}`);
        }
    }, [cameraRef, navigation, salvarUriNota]);

    return (
        <View style={styles.pos}>
            <View style={styles.background}>
                <View style={styles.position}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.btnShot,
                            { opacity: pressed ? 0.5 : 1 },
                        ]}
                        onPress={takePicture}
                    >
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pos: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    background: {
        backgroundColor: '#00000050',
        height: '10%',
    },
    position: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnShot: {
        height: '85%',
        width: '15%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 50,
    },
})
