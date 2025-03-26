import { Alert } from 'react-native';
import { validate_data } from './utils/image/validateBarCode';
import { replace_image, save_image } from './utils/image/storeImage';
import { local_file_list } from './utils/file/fileListManager';

export const store = async (cnpj: string, n_nota: string, serie: string, uri: string) => {
    try {
        const validate = await validate_data(cnpj, n_nota);
        if (validate == ValidateStatus.EXISTENTE) {
            Alert.alert("Nota já armazenada!", "Deseja substituir a imagem antiga?\n\nEsta ação não pode ser desfeita!", [
                {
                    text: "Não",
                    onPress: () => { return },
                    style: 'cancel',
                },
                {
                    text: "Sim",
                    onPress: async () => {
                        await replace_image(uri, cnpj, n_nota, serie)
                        Alert.alert("Armazenou com sucesso");
                    },
                },
            ],
                { cancelable: false }
            )
        } else if (validate == ValidateStatus.NAO_EXISTENTE) {
            try {
                await save_image(uri, cnpj, n_nota, serie)
                Alert.alert("Armazenou com sucesso");
            } catch (err: any) {
                throw new Error(`Erro ao salvar: ${err.message}`)
            }
        } else {
            throw new Error(`Erro: Algum dado pode estar faltando!`)
        }
    } catch (err: any) {
        Alert.alert("Falha ao salvar imagem", `${err.message}`)
    }
}

export const search = async () => {
    try {
        const list = await local_file_list()
        return list
    } catch (err: any) {
        Alert.alert("Falha na recuperação de dados: " + err.message)
    }
}

