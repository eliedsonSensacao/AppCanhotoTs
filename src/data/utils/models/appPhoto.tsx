import { get_img_info } from "../../local/storage/imageInfoList";
import { store } from "../../local/storage/storageManager";
import { CNPJ } from "../enums/enums"
import { FileInfo } from "../interfaces/interfaces";

export class AppPhoto {
    cnpj: string;
    nNota: string;
    serie: string;
    uri: string;
    status?: string;

    constructor();

    constructor(cnpj: string, nNota: string, uri?: string);

    constructor(cnpj?: string, nNota?: string, uri?: string) {
        function getSerie() {
            if (cnpj == CNPJ.MATRIZ) {
                return '01'
            } else if (cnpj == CNPJ.FILIAL) {
                return '06'
            } else {
                return ''
            }
        }
        console.log(cnpj, nNota, uri)
        if (cnpj && nNota) {
            this.cnpj = cnpj;
            this.nNota = nNota
            this.serie = getSerie();
            this.uri = uri || '';
        }
        else {
            throw new Error('Dado faltante')
        }
    }

    async store(): Promise<void> {
        try {
            await store(this.cnpj, this.nNota, this.serie, this.uri)
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(`Erro: ${err.message}`)
            } else {
                throw new Error('Erro desconhecido');
            }
        }
    }

    async get_image_info(): Promise<FileInfo> {
        const file_info: FileInfo | null = await get_img_info(this.nNota, this.cnpj);
        if (!file_info) {
            throw new Error(`Arquivo não encontrado para o cnpj ${this.cnpj} e nota ${this.nNota}`);
        }
        return file_info;
    }
}

