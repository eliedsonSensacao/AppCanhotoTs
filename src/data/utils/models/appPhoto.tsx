import { store } from "../../local/storage/storageManager";

export class AppPhoto {
    cnpj: string;
    nNota: string;
    serie: string;
    uri: string;
    status?: string;

    constructor(cnpj: string, nNota: string, serie: string, uri: string) {
        this.cnpj = cnpj;
        this.nNota = nNota;
        this.serie = serie;
        this.uri = uri;
    }

    async store(): Promise<void> {
        await store(this.cnpj, this.nNota, this.serie, this.uri)
    }
}

