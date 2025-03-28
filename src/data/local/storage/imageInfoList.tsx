import AsyncStorage from "@react-native-async-storage/async-storage";
import { ImageStatus } from "../../utils/enums/enums";
import { FileInfo } from "../../utils/interfaces/interfaces";

const STORAGE_KEY = "@file_list";

// Tipo para a lista de arquivos
type FileInfoList = FileInfo[];

// Variável em cache para armazenar a lista de arquivos
let cachedFiles: FileInfoList;

// Função para carregar arquivos do AsyncStorage
const load_info_list = async (): Promise<FileInfoList> => {
    if (cachedFiles !== null) {
        return cachedFiles;
    }
    try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        cachedFiles = jsonValue ? JSON.parse(jsonValue) : [];
        return cachedFiles;
    } catch (error) {
        console.log("Erro ao carregar informações de status:", error);
        return [];
    }
};

// Função para salvar a lista de arquivos no AsyncStorage
const save_info_list = async (files: FileInfoList): Promise<void> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(files));
        cachedFiles = files;
    } catch (error) {
        console.log("Erro ao salvar informações de status:", error);
    }
};

// Função para obter informações de um arquivo pelo ID (nota e cnpj)
export const get_img_info = async (nota: string, cnpj: string): Promise<FileInfo> => {
    try {
        const list = await load_info_list();
        const file = list.find(obj => obj.nNota === nota && obj.cnpj === cnpj);
        if (!file) {
            throw Error('Erro ao buscar informações do arquivo')
        }
        return file;
    } catch (err: any) {
        throw new Error(`${err.message}`)
    }
};

// Função para obter o status de um arquivo pelo ID (nota e cnpj)
export const get_img_status = async (nota: string, cnpj: string): Promise<string | null> => {
    try {
        const list = await load_info_list();
        const file = list.find(obj => obj.nNota === nota && obj.cnpj === cnpj);
        return file ? file.status : null;
    } catch (err) {
        console.log(`${err}`);
        return null;
    }
};

// Função para obter a data de um arquivo pelo ID (nota e cnpj)
export const get_img_date = async (nota: string, cnpj: string): Promise<string | null> => {
    try {
        const list = await load_info_list();
        const file = list.find(obj => obj.nNota === nota && obj.cnpj === cnpj);
        return file ? file.date : null;
    } catch (err) {
        console.log(`${err}`);
        return null;
    }
};

// Função para definir o status de um arquivo pelo ID (nota e cnpj)
export const set_img_status = async (nota: string, cnpj: string, status: ImageStatus): Promise<void> => {
    try {
        const list = await load_info_list();
        const fileInfo = list.find(obj => obj.nNota === nota && obj.cnpj === cnpj);
        if (fileInfo) {
            fileInfo.status = status;
            await save_info_list(list);
        }
    } catch (err: any) {
        throw new Error(`Erro ao setar status da imagem: ${nota}, ${cnpj}, ${err.message}`);
    }
};

// Função para remover um arquivo da lista de status pelo ID (nota e cnpj)
export const rm_from_infoList = async (nota: string, cnpj: string): Promise<void> => {
    try {
        const list = await load_info_list();
        const new_list = list.filter((item) => item.nNota !== nota || item.cnpj !== cnpj);
        await save_info_list(new_list);
    } catch (err: any) {
        throw new Error(`Erro ao remover ${nota}, ${cnpj}: ${err.message}`);
    }
};

// Função para salvar ou atualizar um arquivo na lista de status
export const update_file_info = async (file: FileInfo): Promise<boolean> => {
    if (!file) {
        throw new Error(`O arquivo é inválido.`);
    }
    try {
        const infoList = await load_info_list();
        const filesMap = new Map(infoList.map(f => [`${f.nNota}-${f.cnpj}`, f])); // Usar nNota e cnpj como chave composta
        filesMap.set(`${file.nNota}-${file.cnpj}`, file);
        const updatedFiles = Array.from(filesMap.values());
        await save_info_list(updatedFiles);
        return true;
    } catch (err: any) {
        console.log("Erro ao salvar status: ", err.message);
        return false;
    }
};

// Função para adicionar um arquivo à lista de status
export const add_file_info = async (fileInfo: FileInfo): Promise<void> => {
    try {
        const infoList = await load_info_list();

        // Adicionar o arquivo à lista
        infoList.push(fileInfo);

        // Salvar a lista atualizada
        await save_info_list(infoList);
    } catch (err: any) {
        throw new Error(`Erro ao adicionar status: ${err.message}`);
    }
};