import * as SecureStore from "expo-secure-store";
import initialConfig from "./config.json";
import { UserConfig } from "@/src/data/utils/interfaces/interfaces";

const CONFIG_KEY = "USER_CONFIG";

const saveToSecureStore = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const loadFromSecureStore = async (key: string): Promise<any> => {
    const storedValue = await SecureStore.getItemAsync(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

const loadConfig = async (): Promise<UserConfig> => {
    const storedConfig = await loadFromSecureStore(CONFIG_KEY);
    if (storedConfig) {
        return storedConfig;
    } else {
        await saveToSecureStore(CONFIG_KEY, initialConfig);
        return initialConfig;
    }
};

const saveConfig = async (config: UserConfig): Promise<void> => {
    await saveToSecureStore(CONFIG_KEY, config);
};

export const set_user_passwd = async (pass: string): Promise<void> => {
    const config = await loadConfig();
    config.USER.passwd = pass;
    await saveConfig(config);
};

export const get_user_passwd = async (): Promise<string> => {
    const config = await loadConfig();
    return config.USER.passwd;
};

export const set_user_name = async (name: string): Promise<void> => {
    const config = await loadConfig();
    config.USER.name = name;
    await saveConfig(config);
};

export const get_user_name = async (): Promise<string> => {
    const config = await loadConfig();
    return config.USER.name;
};

export const set_user_id = async (name: string): Promise<void> => {
    const config = await loadConfig();
    config.USER.id = name;
    await saveConfig(config);
};

export const get_user_id = async (): Promise<string> => {
    const config = await loadConfig();
    return config.USER.id;
};