import { CNPJ } from "@/src/data/utils/enums/enums";

export const filterCodeBar = async (info: string) => {
    try {
        let cnpj = info.slice(6, 20);

        if (cnpj !== CNPJ.MATRIZ && cnpj !== CNPJ.FILIAL) {
            throw new Error(`O CNPJ ${cnpj} não pertence à nenhum parceiro da Laticinios Mania`)
        }

        let serie = info.slice(23, 25)
        let n_nota = info.slice(25, 34)

        return { filteredCnpj: cnpj, filteredSerie: serie, filteredNota: n_nota };
    } catch (err: any) {
        throw new Error(err.message)
    }

}