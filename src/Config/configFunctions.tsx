import * as SecureStore from "expo-secure-store";
import initialConfig from "./config.json";
import { ConfigType } from "../data/utils/interfaces/interfaces";

const CONFIG_KEY = "APP_CONFIG";

const saveToSecureStore = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const loadFromSecureStore = async (key: string): Promise<any> => {
    const storedValue = await SecureStore.getItemAsync(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

const loadConfig = async (): Promise<ConfigType> => {
    const storedConfig = await loadFromSecureStore(CONFIG_KEY);
    if (storedConfig) {
        return storedConfig;
    } else {
        await saveToSecureStore(CONFIG_KEY, initialConfig);
        return initialConfig;
    }
};

const saveConfig = async (config: ConfigType): Promise<void> => {
    await saveToSecureStore(CONFIG_KEY, config);
};

export const set_device_token = async (token: string): Promise<void> => {
    const config = await loadConfig();
    config.DEVICE.token = token;
    await saveConfig(config);
};

export const get_device_token = async (): Promise<string | false> => {
    const config = await loadConfig();
    return config.DEVICE.token ? config.DEVICE.token : false;
};

export const set_device_passwd = async (pass: string): Promise<void> => {
    const config = await loadConfig();
    config.DEVICE.passwd = pass;
    await saveConfig(config);
};

export const get_device_passwd = async (): Promise<string> => {
    const config = await loadConfig();
    return config.DEVICE.passwd;
};

export const set_device_name = async (name: string): Promise<void> => {
    const config = await loadConfig();
    config.DEVICE.name = name;
    await saveConfig(config);
};

export const get_device_name = async (): Promise<string> => {
    const config = await loadConfig();
    return config.DEVICE.name;
};

export const get_api_url = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.url;
};

export const set_api_url = async (url: string): Promise<void> => {
    const config = await loadConfig();
    config.API.url = url;
    await saveConfig(config);
};

export const get_encrypt_key = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.body_encript_key;
};

export const set_encrypt_key = async (passwd: string): Promise<void> => {
    const config = await loadConfig();
    config.API.body_encript_key = passwd;
    await saveConfig(config);
};

export const get_admin_passwd = async (): Promise<string> => {
    const config = await loadConfig();
    return config.ADMIN.passwd;
};

export const set_admin_passwd = async (passwd: string): Promise<void> => {
    const config = await loadConfig();
    config.ADMIN.passwd = passwd;
    await saveConfig(config);
};

export const get_conection_method = async (): Promise<string> => {
    const config = await loadConfig();
    return config.API.method;
};

export const set_conection_method = async (method: string): Promise<void> => {
    const config = await loadConfig();
    config.API.method = method;
    await saveConfig(config);
};
