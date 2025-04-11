import { Dimensions } from "react-native";

// retorna um valor de acordo com a porcentagem do tamanho da tela passada
export const windowWidth = (percentage: number) => {
    const { width } = Dimensions.get('window');
    return Math.round((percentage * width) / 100);
};

export const windowHeight = (percentage: number) => {
    const { height } = Dimensions.get('window');
    return Math.round((percentage * height) / 100);
};
