import * as SecureStore from "expo-secure-store";
import initialConfig from "./config.json";
import { ApiConfig } from "@/src/data/utils/interfaces/interfaces";

const CONFIG_KEY = "API_CONFIG";

const saveToSecureStore = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const loadFromSecureStore = async (key: string): Promise<any> => {
    const storedValue = await SecureStore.getItemAsync(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

const loadConfig = async (): Promise<ApiConfig> => {
    const storedConfig = await loadFromSecureStore(CONFIG_KEY);
    if (storedConfig) {
        return storedConfig;
    } else {
        await saveToSecureStore(CONFIG_KEY, initialConfig);
        return initialConfig;
    }
};

const saveConfig = async (config: ApiConfig): Promise<void> => {
    await saveToSecureStore(CONFIG_KEY, config);
};

// API
export const set_device_token = async (token: string): Promise<void> => {
    const config = await loadConfig();
    config.API.token = token;
    await saveConfig(config);
};

export const get_device_token = async (): Promise<string | false> => {
    const config = await loadConfig();
    return config.API.token ? config.API.token : false;
};

export const set_api_url = async (url: string): Promise<void> => {
    const config = await loadConfig();
    config.API.url = url;
    await saveConfig(config);
};

export const get_api_url = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.url;
};

export const set_encrypt_key = async (passwd: string): Promise<void> => {
    const config = await loadConfig();
    config.API.body_encript_key = passwd;
    await saveConfig(config);
};

export const get_encrypt_key = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.body_encript_key;
};

export const set_conection_protocol = async (method: string): Promise<void> => {
    const config = await loadConfig();
    config.API.protocol = method;
    await saveConfig(config);
};

export const get_conection_protocol = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.protocol;
};