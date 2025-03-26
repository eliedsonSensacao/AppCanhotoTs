import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import * as FileSystem from 'expo-file-system';
import { Image } from 'react-native';

export async function resizeImage(uri: string): Promise<{ uri: string }> {
    let compress = 1;
    let resizedImage: { uri: string };
    let fileSize: number;

    try {

        const { width, height } = await new Promise<{ width: number, height: number }>((resolve, reject) => {
            Image.getSize(uri, (width, height) => resolve({ width, height }), reject);
        });

        const isLandscape = width > height;
        const resizeValue = Math.max(width, height) >= 1500 ? 1500 : 1000;

        do {
            resizedImage = await manipulateAsync(
                uri,
                [{ resize: isLandscape ? { width: resizeValue } : { height: resizeValue } }],
                { compress, format: SaveFormat.JPEG }
            );

            const fileInfo = await FileSystem.getInfoAsync(resizedImage.uri);

            if (!fileInfo.exists) {
                throw new Error("O arquivo não existe.");
            }

            if (fileInfo.size === undefined) {
                throw new Error("Não foi possível obter o tamanho do arquivo.");
            }

            fileSize = fileInfo.size / 1024; // Convert to KB

            if (fileSize > 100) {
                compress -= 0.1;
            }
        } while (fileSize > 90 && compress > 0);

        return resizedImage;
    } catch (err: any) {
        throw new Error(`Erro ao redimensionar imagem: ${err.message}`);
    }
}
