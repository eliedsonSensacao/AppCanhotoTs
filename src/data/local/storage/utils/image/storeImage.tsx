
import * as FileSystem from 'expo-file-system';
import { resizeImage } from './resizeImg';
import { generate_path, get_image_path } from '../storagePath/storagePath';
import { get_local_file } from '../file/getFile';
import { add_file_info, update_file_info } from '../../imageInfoList';
import { resolve_date } from '../date/resolveDate';
import { ImageStatus } from '@/src/data/utils/enums/enums';
import { FileInfo } from '@/src/data/utils/interfaces/interfaces';
import { get_user_name } from '@/src/Config/user.config';

export async function save_image(uri: string, cnpj: string, n_nota: string, serie: string) {
    try {
        const destinationPath = `${FileSystem.documentDirectory}images/${cnpj}_${n_nota}.JPEG`;

        await resize_and_save_image(uri, destinationPath);

        const fileInfo: FileInfo = {
            status: ImageStatus.AGUARDANDO_ENVIO,
            cnpj: cnpj,
            nNota: n_nota,
            serie: serie,
            uri: destinationPath,
            date: await resolve_date(),
            deviceName: await get_user_name()
        }
        await add_file_info(fileInfo);
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Erro ao salvar imagem: ${err.message}`);
        } else {
            throw new Error("Erro desconhecido ao salvar imagem.");
        }
    }
}

export async function replace_image(uri: string, cnpj: string, n_nota: string, serie: string) {
    try {
        const old_image = await get_local_file(cnpj, n_nota);

        if (!old_image) {
            console.log("replace_image: ", old_image)
            throw new Error(`Arquivo com CNPJ ${cnpj} e nota ${n_nota} não encontrado.`);
        }
        const file_path = await get_image_path(old_image);
        await FileSystem.deleteAsync(file_path, { idempotent: true });

        const destinationPath = `${FileSystem.documentDirectory}images/${cnpj}_${n_nota}.JPEG`;

        const NewFileInfo: FileInfo = {
            status: ImageStatus.AGUARDANDO_ENVIO,
            cnpj: cnpj,
            nNota: n_nota,
            serie: serie,
            uri: destinationPath,
            date: await resolve_date(),
            deviceName: await get_user_name()
        }
        await resize_and_save_image(uri, destinationPath);
        await update_file_info(NewFileInfo);
    } catch (err: any) {
        throw new Error(err.message);
    }
}

const resize_and_save_image = async (uri: string, destinationPath: string) => {
    try {
        const resizedImage = await resizeImage(uri);
        await generate_path();
        await FileSystem.copyAsync({
            from: resizedImage.uri,
            to: destinationPath
        });
    } catch (err: any) {
        throw new Error(err.message);
    }
};