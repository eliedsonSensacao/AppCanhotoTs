
import * as FileSystem from 'expo-file-system';
import { resizeImage } from './resizeImg';
import { generate_path, get_images_path } from '../storagePath/storagePath';
import { get_local_file } from '../file/getFile';
import { add_file_info, get_file_info, rm_from_infoList, update_file_info } from '../../imageInfoList';
import { resolve_date } from '../date/resolveDate';
import { get_device_name } from '@/src/Config/configFunctions';

export async function save_image(uri: string, cnpj: string, n_nota: string, serie: string) {
    try {
        const destinationPath = `${FileSystem.documentDirectory}images/${cnpj}_${n_nota}.JPEG`;

        await resize_and_save_image(uri, destinationPath);
        const fileInfo: FileInfo = {
            status: ImageStatus.AGUARDANDO_ENVIO,
            cnpj: cnpj,
            nNota: n_nota,
            serie: serie,
            uri: uri,
            date: await resolve_date(),
            deviceName: await get_device_name()
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
        const old_image = await get_local_file(n_nota, cnpj);
        const oldFileInfo = await get_file_info(n_nota, cnpj);

        if (!old_image || !oldFileInfo) {
            throw new Error(`Arquivo com CNPJ ${cnpj} e nota ${n_nota} não encontrado.`);
        }

        const NewFileInfo: FileInfo = {
            status: ImageStatus.AGUARDANDO_ENVIO,
            cnpj: cnpj,
            nNota: n_nota,
            serie: serie,
            uri: uri,
            date: await resolve_date(),
            deviceName: await get_device_name()
        }

        const file_path = await get_images_path(old_image);

        const destinationPath = `${FileSystem.documentDirectory}images/${cnpj}_${n_nota}.JPEG`;
        await FileSystem.deleteAsync(file_path, { idempotent: true });
        await resize_and_save_image(uri, destinationPath);
        await rm_from_infoList(oldFileInfo.nNota, oldFileInfo.cnpj);
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
        return resizedImage.uri;
    } catch (err: any) {
        throw new Error(err.message);
    }
};