
import { View, TextInput, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { Picker } from '@react-native-picker/picker'
import React, { useEffect, useState } from 'react';
import { PasswdPopUp } from '@/src/components/screenComponents/Config/components/popUp';
import ComponentButton from '@/src/components/globalComponents/buttons/Button';
import Toast from 'react-native-toast-message';
import { get_user_id, get_user_name, get_user_passwd } from '@/src/Config/user.config';
import { get_api_url, get_conection_protocol } from '@/src/Config/api.config';
import StyledText from '@/src/components/globalComponents/StyledText';


export type ConfigData = {
    userId: string
    userName: string,
    userPasswd: string,
    apiUrl: string,
    protocol: string
};

export default function SettingsScreen() {
    const [userId, setUserId] = useState('');
    const [userName, setuserName] = useState('');
    const [userPasswd, setuserPasswd] = useState('');
    const [apiUrl, setApiUrl] = useState('');
    const [protocol, setProtocol] = useState('');
    const [visible, setVisible] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false);

    async function load_info() {
        try {
            const stored_userId = await get_user_id();
            const stored_userName = await get_user_name();
            const stored_userPasswd = await get_user_passwd();
            const stored_apiUrl = await get_api_url();
            const stored_protocol = await get_conection_protocol();

            setUserId(stored_userId);
            setuserName(stored_userName);
            setuserPasswd(stored_userPasswd);
            setApiUrl(stored_apiUrl);
            setProtocol(stored_protocol)

        } catch (err) {
            if (err instanceof Error) {
                throw new Error(err.message)
            } else {
                throw new Error('Erro desconhecido ao carregar dados')
            }
        }
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
        userId: userId,
        userName: userName,
        userPasswd: userPasswd,
        apiUrl: apiUrl,
        protocol: protocol
    }

    const onRefresh = async () => {
        try {
            setIsRefreshing(true);
            await load_info();
            //await request_connection();
        } catch (err: any) {
            Toast.show({ type: 'error', text1: 'Erro', text2: err.message })
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
                <StyledText type='title'>Configurações de Usuário</StyledText>
                <StyledText type='subtitle'>Usuário</StyledText>
                <TextInput
                    style={styles.input}
                    placeholder="  ID de Usuário"
                    value={userId}
                    onChangeText={(text) => setUserId(text.trim())}
                />
                <TextInput
                    style={styles.input}
                    placeholder="  Informe o nome de usuário"
                    value={userName}
                    onChangeText={(text) => setuserName(text.trim())}
                />

                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    placeholder="  Senha"
                    value={userPasswd}
                    onChangeText={(text) => setuserPasswd(text.trim())}
                />
                <PasswdPopUp
                    visible={visible}
                    closePopup={closePopup}
                    dataToValidate={data}
                />
            </View>
            <View style={styles.subContainer}>
                <StyledText type='title'>Conexão</StyledText>
                <StyledText type='subtitle'>Usuário</StyledText>
                <StyledText>Metodo de Envio:</StyledText>
                <Picker
                    selectedValue={protocol}
                    onValueChange={(itemValue) => setProtocol(itemValue)}
                >
                    <Picker.Item label="HTTP" value="http://" />
                    <Picker.Item label="HTTPS" value="https://" />
                </Picker>
                <StyledText>Endereço do Servidor:</StyledText>
                <TextInput
                    style={styles.input}
                    placeholder=" seuenderecoaqui.com/canhotoapi"
                    value={apiUrl}
                    onChangeText={(text) => setApiUrl(text.trim())}
                />
            </View>
            <View style={styles.saveBtnPos}>
                <ComponentButton text='Salvar' onPress={() => showPopup()} />
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
        borderRadius: 5,
        marginVertical: 10
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
    }
});
