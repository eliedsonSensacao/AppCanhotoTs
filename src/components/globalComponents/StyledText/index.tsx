import { windowWidth } from "@/src/functions/utils/getScreenDimensions";
import { StyleSheet, Text, TextProps } from "react-native";

type StyledTextTypes = TextProps & {
    type?: 'default' | 'title' | 'subtitle' | 'label'
}

export default function StyledText({ type = 'default', style, children, ...refs }: StyledTextTypes) {
    return (
        <Text style={[styles[type], style]} {...refs}>
            {children}
        </Text>
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: windowWidth(3.5),
        color: '#000',
    },
    title: {
        fontSize: windowWidth(5),
        fontWeight: 'bold',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: windowWidth(4),
        fontWeight: '600',
    },
    label: {
        fontSize: windowWidth(2),
        color: '#666',
    },
})