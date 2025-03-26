import * as FileSystem from 'expo-file-system';

export async function get_local_file(cnpj: string, n_nota: string) {
    try {
        const files = await FileSystem.readDirectoryAsync(`${FileSystem.documentDirectory}/images/`)
        const result = files.find((file) => {
            const [this_cnpj, this_n_nota] = file.split('.')[0].split('_');
            return this_cnpj == cnpj && this_n_nota == n_nota
        })
        return result
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Erro ao buscar arquivo: ${err.message}`);
        } else {
            throw new Error(`Erro desconhecido ao buscar arquivo`);
        }
    }
}