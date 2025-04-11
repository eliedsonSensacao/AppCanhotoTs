import { Alert } from 'react-native';

export const confirmAlert = (title: string, message: string): Promise<boolean> => {
    return new Promise((resolve) => {
        Alert.alert(
            title,
            message,
            [
                {
                    text: 'Não',
                    onPress: () => resolve(false),
                    style: 'cancel',
                },
                {
                    text: 'Sim',
                    onPress: () => resolve(true),
                },
            ],
            { cancelable: false }
        );
    });
};
