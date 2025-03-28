import * as FileSystem from 'expo-file-system';
import { get_image_path } from '../storagePath/storagePath';

export const delete_file = async (file_name: string) => {
    try {
        const file_path = await get_image_path(file_name);
        await FileSystem.deleteAsync(file_path, { idempotent: true })
    } catch (err: any) {
        throw new Error(err.message)
    }
}