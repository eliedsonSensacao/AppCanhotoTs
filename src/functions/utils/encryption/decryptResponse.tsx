import crypto from 'crypto-js';

export const decryptResponse = async (encryptedData: string, decriptKey: string) => {
    try {
        const bytes = crypto.AES.decrypt(encryptedData, decriptKey, {
            mode: crypto.mode.CBC,
            padding: crypto.pad.Pkcs7
        });
        return bytes.toString(crypto.enc.Utf8);
    } catch (error) {
        throw new Error('Falha na decriptação');
    }
};