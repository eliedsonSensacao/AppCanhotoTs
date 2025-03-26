
export const filterCodeBar = async (info: string) => {
    try {

        const matriz = "04846441000160"
        const filial = "04846441000593"

        let cnpj = info.slice(6, 20);

        if (cnpj != matriz && cnpj != filial) {
            throw new Error(`O CNPJ ${cnpj} não pertence à nenhum parceiro da Laticinios Mania`)
        }

        let serie = info.slice(23, 25)
        let n_nota = info.slice(25, 34)

        return { filteredCnpj: cnpj, filteredSerie: serie, filteredNota: n_nota };
    } catch (err: any) {
        throw new Error(err.message)
    }

}