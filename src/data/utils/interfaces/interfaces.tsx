import { ImageStatus } from "../enums/enums";

export interface UserConfig {
    USER: {
        id: string;
        name: string;
        passwd: string;
    };
}

export interface AdminConfig {
    ADMIN: {
        passwd: string;
    };
}

export interface ApiConfig {
    API: {
        url: string;
        body_encript_key: string;
        protocol: string;
        token: string;
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