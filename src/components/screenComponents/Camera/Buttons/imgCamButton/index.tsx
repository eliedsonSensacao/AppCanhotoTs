import { StyleSheet, Pressable, Image } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { useEffect, useState } from 'react';
import { useNotasContext } from '@/src/Context/notaContext';
import { useRouter } from 'expo-router';

export default function CamButton() {
    const navigation = useRouter();
    const { dadosNota } = useNotasContext();
    const [src, setSrc] = useState<string>('');

    useEffect(() => {
        if (dadosNota?.img_uri) {
            setSrc(dadosNota.img_uri);
        } else {
            setSrc('');
        }
    }, [dadosNota?.img_uri]);

    return (
        <Pressable style={styles.button} onPress={() => navigation.navigate('/(camera)/imagePicker')}>
            {src ? (
                <Image source={{ uri: src }} style={styles.src} />
            ) : (
                <Entypo name="camera" size={100} color="black" />
            )}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '100%',
        height: '100%',
        backgroundColor: '#CCEDFF',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    src: {
        width: '100%',
        height: '100%',
        borderRadius: 3,
        resizeMode: 'stretch'
    },
});
