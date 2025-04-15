import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { get_admin_passwd, set_api_url, set_conection_method, set_device_name, set_device_passwd, set_device_token } from '@/src/Config/configFunctions';
import { useRouter } from 'expo-router';


interface PasswdPopUpProps {
    visible: boolean,
    closePopup: VoidFunction,
    dataToValidate: ConfigData
}

export const PasswdPopUp: React.FC<PasswdPopUpProps> = ({ visible, closePopup, dataToValidate }) => {
    
    const [text, setText] = useState<string>('');
    const navigation = useRouter();

    const confirm_passwd = async (insertedPass: string) => {
        const adm_pass = await get_admin_passwd();
        if (adm_pass != insertedPass) {
            return false
        } else {
            return true
        }
    }

    const saveConfig = async (insertedPass: string) => {

        if (await confirm_passwd(insertedPass) == true) {
            try {
                await set_device_passwd(dataToValidate.passwd);
                await set_device_name(dataToValidate.deviceName);
                await set_api_url(dataToValidate.url);
                await set_conection_method(dataToValidate.method);
                await set_device_token('');
                Alert.alert("Configurações salvas");
                closePopup();
                navigation.replace('/(tabs)/config');
            } catch (err: unknown) {
                if (err instanceof Error) {
                    Alert.alert("Erro ao salvar configuração: ", err.message)
                } else {
                    Alert.alert("Erro desconhecido")
                }
            }
        } else {
            Alert.alert("Erro!", " A senha que voce digitou esta incorreta!");
        }
    };

    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                animationType='none'
                onRequestClose={closePopup}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.txtBox}>
                        <Text style={styles.label}> Senha de Administrador </Text>

                        <TextInput style={styles.input} numberOfLines={1} onChangeText={(text) => setText(text.trim())} secureTextEntry={true}></TextInput>

                        <TouchableOpacity onPress={async () => { await saveConfig(text) }} style={styles.button}>
                            <Text style={styles.buttonText}>Confirmar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        backgroundColor: '#00000060',
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: '3%'
    },
    input: {
        backgroundColor: "#00000020",
        marginHorizontal: '5%',
        paddingHorizontal: '15%',
        borderRadius: 5,
        fontSize: 15,
    },
    button: {
        backgroundColor: '#007BFF',
        borderRadius: 5,
        alignItems: 'center',
        marginVertical: '5%',
        marginHorizontal: '5%',
        paddingVertical: '5%'
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 15,
    },
    txtBox: {
        maxHeight: '70%',
        backgroundColor: "#ffffff",
        borderRadius: 5,
        width: '70%'

    },


});

