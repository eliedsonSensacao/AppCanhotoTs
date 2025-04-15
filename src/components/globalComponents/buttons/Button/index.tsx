import { windowWidth } from '@/src/functions/utils/getScreenDimensions';
import { Pressable, Text } from 'react-native';
import { StyleSheet } from 'react-native';

type ButtonProps = {
    text: string,
    onPress: () => void
}

export default function ComponentButton({ text, onPress }: ButtonProps) {
    return (
        <Pressable
            style={({ pressed }) => [
                Styles.button,
                pressed && Styles.pressed
            ]}
            onPress={onPress}
        >
            <Text style={Styles.text}>{text}</Text>
        </Pressable>
    );
}

const Styles = StyleSheet.create({
    button: {
        elevation: 4,
        justifyContent: 'center',
        height: '25%',
        width: '25%',
        borderRadius: 3,
        backgroundColor: '#ffea00'
    },
    text: {
        fontSize: windowWidth(4),
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    pressed: {
        backgroundColor: '#cfbe0a',
        transform: [{ scale: 0.95 }]
    }
});