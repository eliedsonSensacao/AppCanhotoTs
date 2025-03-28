import { ImageStatus } from "../enums/enums";

export interface ConfigType {
    API: {
        url: string;
        body_encript_key: string;
        method: string;
    };
    DEVICE: {
        name: string;
        passwd: string;
        token: string;
    };
    ADMIN: {
        passwd: string;
    };
}

export interface FileInfo {
    status: ImageStatus;
    cnpj: string;
    nNota: string;
    serie: string;
    uri: string;
    date: string;
    deviceName: string;
}


export interface DadoNotaDisplay {
    id: string;
    text: string;
    placeholder: string;
    value: string;
    length: number;
}