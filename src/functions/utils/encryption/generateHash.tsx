import bcrypt from 'bcrypt'

export async function generateHash(word: string) {
    try {
        const hashedString = await new Promise((resolve, reject) => {
            bcrypt.hash(word, 3, (err, result) => {
                if (err) {
                    reject(new Error("Erro ao gerar o hash: " + err));
                } else {
                    resolve(result);
                }
            });
        });
        return hashedString;
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro: ${err.message}`);
        } else {
            throw new Error(`Erro desconhecido ao gerar hash`)
        }
    }
}