
import { View, TextInput, StyleSheet, ScrollView, RefreshControl, Text, Alert, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker'

import React, { useEffect, useState } from 'react';
import { get_api_url, get_conection_method, get_device_name, get_device_passwd } from '@/src/Config/configFunctions';
import { PasswdPopUp } from '@/src/components/ConfigurationComponents/components/popUp';

export default function SettingsScreen() {
    const [deviceName, setDeviceName] = useState('');
    const [url, setUrl] = useState('');
    const [passwd, setPasswd] = useState('');
    const [method, setMethod] = useState('');
    const [visible, setVisible] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function load_info() {
        const stored_name = await get_device_name();
        const stored_passwd = await get_device_passwd();
        const stored_url = await get_api_url();
        const stored_method = await get_conection_method();
        setDeviceName(stored_name);
        setPasswd(stored_passwd);
        setUrl(stored_url);
        setMethod(stored_method)
    }

    useEffect(() => {
        load_info();
    }, [])

    const showPopup = () => {
        setVisible(true)
    }
    const closePopup = () => {
        setVisible(false)
    }

    const data: ConfigData = {
        deviceName: deviceName,
        url: url,
        passwd: passwd,
        method: method
    }

    const onRefresh = async () => {
        try {
            setIsRefreshing(true);
            await load_info();
            //await request_connection();

        } catch (err: any) {
            Alert.alert('Erro', err.message)
        } finally {
            setIsRefreshing(false)
        }
    }

    return (
        <ScrollView
            style={styles.container}
            refreshControl={<RefreshControl
                refreshing={isRefreshing}
                onRefresh={onRefresh}
                colors={['#ffc801', '#ffffff']}
                progressBackgroundColor="#0090ced6" />
            }>
            <View style={styles.subContainer}>
                <Text style={styles.title}>Configurações de usuário</Text>
                <Text style={styles.subTitle}>Usuário:</Text>
                <TextInput
                    style={styles.input}
                    placeholder="  Informe o nome de usuário"
                    value={deviceName}
                    onChangeText={(text) => setDeviceName(text.trim())}
                />
                <Text style={styles.subTitle}>Senha de acesso ao servidor:</Text>
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="  Insira sua senha"
                    value={passwd}
                    onChangeText={(text) => setPasswd(text.trim())}
                />
                <PasswdPopUp
                    visible={visible}
                    closePopup={closePopup}
                    dataToValidate={data}
                />
            </View>
            <View style={styles.subContainer}>
                <Text>Metodo de envio:</Text>
                <Picker
                    selectedValue={method}
                    onValueChange={(itemValue) => setMethod(itemValue)}
                >
                    <Picker.Item label="Http" value="http://" />
                    <Picker.Item label="Https" value="https://" />
                </Picker>
                <Text>Endereço do servidor:</Text>
                <TextInput
                    style={styles.input}
                    placeholder=" seuenderecoaqui.com/canhotoapi"
                    value={url}
                    onChangeText={(text) => setUrl(text.trim())}
                />
            </View>
            <View style={styles.saveBtnPos}>
                <Pressable style={styles.saveBtn} onPress={() => showPopup()}>
                    <Text style={styles.text}>Salvar</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#0090CE',
    },
    subContainer: {
        elevation: 10,
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
    },
    subTitle: {
        fontSize: 15,
        marginBottom: 2,
        textAlign: 'left',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        marginBottom: 16,
        backgroundColor: '#fff',
    },
    saveBtnPos: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    saveBtn: {
        elevation: 4,
        justifyContent: 'center',
        height: '30%',
        width: '40%',
        borderRadius: 3,
        backgroundColor: '#ffea00'
    },
    text: {
        fontSize: 10,
        alignSelf: 'center'
    }
});
