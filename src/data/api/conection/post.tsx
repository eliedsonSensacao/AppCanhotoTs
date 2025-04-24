import { get_api_url, get_conection_protocol } from "@/src/Config/api.config";
import { autenticationHeader } from "../request.components/header/header"

export const sendImage = async (cnpj: string, nota: string) => {
    try {
        const API_URL = await get_api_url();
        const protocol = await get_conection_protocol();
        const response = await fetch(`${protocol}${API_URL}/mobile/auth/ask-for-a-token`, {
            method: 'GET',
            headers: autenticationHeader
        })
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || 'Erro ao enviar imagem.');
        }
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao enviar imagem para api: ${err.message}`)
        } else {
            throw new Error(`Erro desconhecido ao enviar imagem para api`)
        }
    }
}