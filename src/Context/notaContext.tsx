import React, { createContext, ReactNode, useState, useContext } from "react";

type NotasState = {
    cnpj?: string;
    serie?: string;
    n_nota?: string;
    img_uri?: string;
};

type NotasContextType = {
    dadosNota: NotasState;
    salvarDadosNota: (cnpj: string, serie: string, n_nota: string) => void;
    salvarUriNota: (img_uri: string) => void;
    clearDadosNota: () => void;
};

// Criando o contexto com um valor padrão
export const NotasContext = createContext<NotasContextType | undefined>(undefined);

// Tipo das props do provider
type NotasProviderProps = {
    children: ReactNode;
};

export const NotasProvider = ({ children }: NotasProviderProps) => {
    const [dadosNota, setDadosNota] = useState<NotasState>({});

    const salvarDadosNota = (cnpj: string, serie: string, n_nota: string) => {
        setDadosNota(prevState => ({
            ...prevState,
            cnpj,
            serie,
            n_nota
        }));
    };

    const salvarUriNota = (img_uri: string) => {
        setDadosNota(prevState => ({
            ...prevState,
            img_uri
        }));
    };

    const clearDadosNota = () => {
        setDadosNota({});
    };

    return (
        <NotasContext.Provider value={{ dadosNota, salvarDadosNota, salvarUriNota, clearDadosNota }}>
            {children}
        </NotasContext.Provider>
    );
};

// Custom Hook para consumir o contexto
export const useNotasContext = () => {
    const context = useContext(NotasContext);
    if (!context) {
        throw new Error("useNotasContext deve ser usado dentro de um NotasProvider.");
    }
    return context;
};
