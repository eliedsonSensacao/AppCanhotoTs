import { get_img_info } from "../../local/storage/imageInfoList";
import { store } from "../../local/storage/storageManager";

export class AppPhoto {
    cnpj: string;
    nNota: string;
    serie: string;
    uri: string;
    status?: string;

    constructor();

    constructor(cnpj: string, nNota: string, uri?: string);

    constructor(cnpj?: string, nNota?: string, uri?: string) {
        this.cnpj = cnpj || '';
        this.nNota = nNota || '';
        this.serie = cnpj == CNPJ.MATRIZ ? ('01') : (cnpj == CNPJ.FILIAL ? ('06') : (''));
        this.uri = uri || '';
    }

    async store(): Promise<void> {
        await store(this.cnpj, this.nNota, this.serie, this.uri)
    }

    async get_image_info(): Promise<FileInfo> {
        const file_info: FileInfo | null = await get_img_info(this.nNota, this.cnpj);
        if (!file_info) {
            throw new Error(`Arquivo não encontrado para o cnpj ${this.cnpj} e nota ${this.nNota}`);
        }
        return file_info;
    }
}

