import { CNPJ, ValidateStatus } from "@/src/data/utils/enums/enums";
import { local_file_list } from "../file/fileListManager";

export async function validate_data(cnpj: string, n_nota: string): Promise<ValidateStatus> {
    try {
        if (!cnpj || !n_nota) {
            throw new Error('Dados não encontrados')
        }
        if (!/^\d{14}$/.test(cnpj)) {
            throw new Error('O CNPJ deve conter exatamente 14 dígitos')
        }

        if (!/^\d{9,}$/.test(n_nota)) {
            throw new Error('O numero da nota deve conter pelo menos 9 dígitos')
        }

        if (cnpj != CNPJ.MATRIZ && cnpj != CNPJ.FILIAL) {
            throw new Error('O CNPJ não corresponde ao de um colaborador')
        }

        const file_list: string[] = await local_file_list();

        for (const file of file_list) {
            const [thisCnpj, nota] = file.split('.')[0].split('_');
            if (nota === n_nota && thisCnpj === cnpj) {
                return ValidateStatus.EXISTENTE;
            }
        }

        return ValidateStatus.NAO_EXISTENTE;
    } catch (err: unknown) {
        if (err instanceof Error) {
            throw new Error(`Validadate Error: ${err.message}`);
        } else {
            throw new Error(`Erro desconhecido ao validar dados`);
        }
    }
}