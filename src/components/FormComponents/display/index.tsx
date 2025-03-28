import { StyleSheet, TextInput, View, Text } from 'react-native';
import React from 'react';
import { useNotasContext } from '@/src/Context/notaContext';
import { DadoNotaDisplay } from '@/src/data/utils/interfaces/interfaces';

export default function InfoDisplay() {

    const { dadosNota } = useNotasContext()

    const dados: DadoNotaDisplay[] = [
        { id: 'box-cnpj', text: "CNPJ:", placeholder: '00.000.000/0000-00', value: dadosNota.cnpj ?? '', length: 14 },
        { id: 'box-serie', text: "Serie:", placeholder: '000', value: dadosNota.serie ?? '', length: 3 },
        { id: 'box-nota', text: "Nota:", placeholder: '000.000', value: dadosNota.n_nota ?? '', length: 9 },
    ]

    return (
        <View style={Styles.displayBox}>
            {dados.map(dado => (
                <View key={dado.id} style={Styles.txtSubBox}>
                    <Text style={Styles.label}>
                        {dado.text}
                    </Text>
                    <TextInput
                        style={Styles.inputTxt}
                        editable={false}
                        placeholder={dado.placeholder}
                        maxLength={dado.length}
                        value={dado.value ?? ''} />
                </View>))}
        </View>

    );
};


const Styles = StyleSheet.create(
    {
        displayBox: {

            alignItems: 'flex-start',
            backgroundColor: '#CCEDFF30',
            borderRadius: 5,
            borderWidth: 1,
            borderColor: 'black',

        },
        txtSubBox: {
            alignItems: 'center',
            flexDirection: 'row',
            marginVertical: "3%",
            marginLeft: '10%'

        },
        label: {
            fontSize: 20,
            fontWeight: 'bold',
            marginLeft: 5
        },
        inputTxt: {
            fontSize: 15,
            color: '#FFF',
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 2,
            marginRight: 2,
            backgroundColor: '#00005f15',
            borderRadius: 5
        },
    }
)