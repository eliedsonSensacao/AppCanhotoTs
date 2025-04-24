import { get_api_url, get_conection_protocol, get_device_token, get_encrypt_key, set_device_token } from "@/src/Config/api.config";
import { get_user_id, get_user_passwd } from "@/src/Config/user.config";
import { autenticationHeader } from "../request.components/header/header";
import { generateHash } from "@/src/functions/utils/encryption/generateHash";
import { decryptResponse } from "@/src/functions/utils/encryption/decryptResponse";
import { set_admin_passwd } from "@/src/Config/admin.config";

export const requestToken = async () => {
    try {
        const device_token = await get_device_token();
        if (device_token && device_token !== '') {
            return
        };

        const API_URL = await get_api_url();
        const protocol = await get_conection_protocol();
        const secret_key = await get_encrypt_key();
        const data = await generateHash(await JSON.stringify({ user_uuid: await get_user_id(), user_passwd: await get_user_passwd() }));

        const response = await fetch(`${protocol}${API_URL}/mobile/auth/ask-for-a-token`, {
            method: 'GET',
            headers: autenticationHeader,
            body: JSON.stringify(data)
        })

        if (!response.ok) {
            await set_device_token('');
            return false;
        }

        const encriptedResponse = await response.json()
        const decryptedResponse = await decryptResponse(encriptedResponse, secret_key);
        const parsedResponse = await JSON.parse(decryptedResponse);
        await set_device_token(parsedResponse.token);
        await set_admin_passwd(parsedResponse.mobile_passwd);
        return true
    } catch (err) {
        if (err instanceof Error) {
            throw new Error(`Erro ao requisitar token da api: ${err.message}`)
        } else {
            throw new Error(`Erro desconhecido ao requisitar token da api`)
        }
    }
}