import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { ConfigData } from '@/app/(tabs)/config';
import { set_user_id, set_user_name, set_user_passwd } from '@/src/Config/user.config';
import { set_api_url, set_conection_protocol, set_device_token } from '@/src/Config/api.config';
import { get_admin_passwd } from '@/src/Config/admin.config';


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
        if (adm_pass !== insertedPass) {
            return false
        } else {
            return true
        }
    }

    const saveConfig = async (insertedPass: string) => {
        if (await confirm_passwd(insertedPass) === true) {
            try {
                await set_user_id(dataToValidate.userId)
                await set_user_passwd(dataToValidate.userPasswd);
                await set_user_name(dataToValidate.userName);
                await set_api_url(dataToValidate.apiUrl);
                await set_conection_protocol(dataToValidate.protocol);
                await set_device_token('');
                Toast.show({ type: 'success', text1: 'Configurações salvas com sucesso' })
            } catch (err: unknown) {
                if (err instanceof Error) {
                    Toast.show({ type: 'error', text1: 'Erro ao salvar configuração', text2: err.message })
                } else {
                    Toast.show({ type: 'error', text1: 'Erro ao salvar configuração' })
                }
            } finally {
                closePopup();
                navigation.replace('/(tabs)/config');
            }
        } else {
            Alert.alert("Erro ao savar configuração", "Senha inorreta");
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

