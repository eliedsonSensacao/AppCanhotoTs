import * as FileSystem from 'expo-file-system';

export async function get_image_path(file_name: string) {
    try {
        const path = `${FileSystem.documentDirectory}images/${file_name}`
        return path
    } catch (err: any) {
        throw new Error(err.message)
    }
}

export async function generate_path() {
    const img_path = `${FileSystem.documentDirectory}images/`
    try {
        await FileSystem.makeDirectoryAsync(img_path, { intermediates: true })
    } catch (err: any) {
        if (err === 'E_DIRECTORY_EXISTS') {
            return null
        } else {
            throw new Error(`Nao foi possivel criar pasta de armazenamento ${err.message}`)
        }
    }
}