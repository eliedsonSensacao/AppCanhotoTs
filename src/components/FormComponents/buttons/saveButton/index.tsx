import { NotasContext, NotasContextType } from '@/src/Context/notaContext';
import { Alert, Pressable, Text } from 'react-native';
import { useContext, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function SaveButton() {
    const navigation = useRouter();
    const { dadosNota, clearDadosNota } = useContext(NotasContext as React.Context<NotasContextType>)
    const [isPressed, setIsPressed] = useState(false);

    const salvar = async () => {
        try {
            console.log()
            //await store_data(dadosNota.cnpj, dadosNota.serie, dadosNota.n_nota, dadosNota.img_uri);
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
        fontSize: 10,
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