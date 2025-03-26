import { useNotasContext } from '@/src/Context/notaContext';
import { Alert, Pressable, Text } from 'react-native';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { AppPhoto } from '@/src/data/utils/models/appPhoto';

export default function SaveButton() {
    const navigation = useRouter();
    const { dadosNota, clearDadosNota } = useNotasContext();
    const [isPressed, setIsPressed] = useState(false);

    const salvar = async () => {
        try {
            if (!dadosNota.cnpj || !dadosNota.n_nota) {
                throw new Error("Não há dados para salvar")
            }
            const photo: AppPhoto = new AppPhoto(dadosNota.cnpj, dadosNota.n_nota, dadosNota.img_uri);
            photo.store();

        } catch (err: any) {
            Alert.alert("Erro ao salvar", err.message)
        } finally {
            clearDadosNota();
            navigation.replace('/(tabs)/form');
        }
    }
    return (
        <Pressable
            style={({ pressed }) => [
                Styles.button,
                pressed && Styles.pressed
            ]}
            onPressIn={() => setIsPressed(true)}
            onPressOut={() => setIsPressed(false)}
            onPress={salvar}
        >
            <Text style={Styles.text}>Salvar</Text>
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    button: {
        width: '30%',
        backgroundColor: '#FFD749',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold',
        paddingTop: '15%',
        paddingBottom: '15%',
        paddingLeft: "20%",
        paddingRight: "20%"
    },
    pressed: {
        opacity: 0.5,
        transform: [{ scale: 0.95 }]
    }
});