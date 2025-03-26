import { local_file_list } from "../file/fileListManager";

export async function validate_data(cnpj: string, n_nota: string): Promise<ValidateStatus> {
    try {
        // Validação básica do CNPJ e número da nota
        if (!cnpj || !n_nota) {
            throw new Error('Dados não encontrados')
        }

        // Validação adicional do CNPJ (exemplo simples)
        if (!/^\d{14}$/.test(cnpj)) {
            throw new Error('O CNPJ deve conter exatamente 14 dígitos')
        }

        // Validação adicional do número da nota (exemplo simples)
        if (!/^\d{9,}$/.test(n_nota)) {
            throw new Error('O numero da nota deve conter pelo menos 9 dígitos')
        }

        if (cnpj != CNPJ.MATRIZ && cnpj != CNPJ.FILIAL) {
            throw new Error('O CNPJ não corresponde ao de um colaborador')
        }

        const file_list: string[] = await local_file_list();
        for (const file of file_list) {
            const nota = file.split('_')[1].split('.')[0];
            if (nota === n_nota) {
                return ValidateStatus.EXISTENTE;
            }
        }

        return ValidateStatus.NAO_EXISTENTE;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`${err.message}`);
        } else {
            throw new Error(`Erro desconhecido ao validar dados`);
        }
    }
}