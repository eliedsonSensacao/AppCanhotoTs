import * as FileSystem from 'expo-file-system';
import { generate_path } from '../storagePath/storagePath';

export async function local_file_list() {
    let files
    try {
        await generate_path()
        files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}/images/`)
        //console.log("local_file list   ", files)
        return files;
    } catch (err: any) {
        if (files == null) {
            return []
        }
        throw new Error(`Erro ao criar Lista: ${err.message}`)
    }
}