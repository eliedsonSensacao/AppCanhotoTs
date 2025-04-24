import * as SecureStore from "expo-secure-store";
import initialConfig from "./config.json";
import { AdminConfig } from "@/src/data/utils/interfaces/interfaces";

const CONFIG_KEY = "ADMIN_CONFIG";

const saveToSecureStore = async (key: string, value: any) => {
    await SecureStore.setItemAsync(key, JSON.stringify(value));
};

const loadFromSecureStore = async (key: string): Promise<any> => {
    const storedValue = await SecureStore.getItemAsync(key);
    return storedValue ? JSON.parse(storedValue) : null;
};

const loadConfig = async (): Promise<AdminConfig> => {
    const storedConfig = await loadFromSecureStore(CONFIG_KEY);
    if (storedConfig) {
        return storedConfig;
    } else {
        await saveToSecureStore(CONFIG_KEY, initialConfig);
        return initialConfig;
    }
};

const saveConfig = async (config: AdminConfig): Promise<void> => {
    await saveToSecureStore(CONFIG_KEY, config);
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
