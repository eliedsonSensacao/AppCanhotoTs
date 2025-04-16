
import { validate_data } from './utils/image/validateBarCode';
import { replace_image, save_image } from './utils/image/storeImage';
import { local_file_list } from './utils/file/fileListManager';
import { ValidateStatus } from '../../utils/enums/enums';
import { confirmAlert } from './utils/alerts/confirmAlert';
import Toast from 'react-native-toast-message';

export const store = async (cnpj: string, n_nota: string, serie: string, uri: string): Promise<void> => {
    try {
        const validate = await validate_data(cnpj, n_nota);
        if (validate == ValidateStatus.EXISTENTE) {
            const userConfirmed = await confirmAlert(
                "Nota já armazenada!",
                "Deseja substituir a imagem antiga?\n\nEsta ação não pode ser desfeita!"
            );

            if (userConfirmed) {
                await replace_image(uri, cnpj, n_nota, serie);
                Toast.show({ type: 'success', text1: 'Imagem substituida com sucesso' })
            } else {
                console.log("Usuário cancelou a substituição.");
                return;
            }
        } else if (validate == ValidateStatus.NAO_EXISTENTE) {
            try {
                await save_image(uri, cnpj, n_nota, serie)
                Toast.show({ type: 'success', text1: 'Imagem armazenada com sucesso' })
            } catch (err: any) {
                throw new Error(`Erro ao salvar: ${err.message}`)
            }
        } else {
            throw new Error(`Erro: Algum dado pode estar faltando!`)
        }
    } catch (err: any) {
        Toast.show({ type: 'error', text1: 'Falha ao salvar imagem', text2: err.message })
    }
}

export const search = async () => {
    try {
        const list = await local_file_list()
        return list
    } catch (err: any) {
        Toast.show({ type: 'error', text1: 'Falha na recuperação de dados:', text2: err.message })
    }
}

