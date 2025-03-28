import * as React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

interface ShotButtonProps {
    onPress: () => void;
}
export const ShotButton: React.FC<ShotButtonProps> = ({ onPress }) => {

    return (
        <View style={styles.pos}>
            <View style={styles.background}>
                <View style={styles.position}>
                    <Pressable
                        style={({ pressed }) => [
                            styles.btnShot,
                            { opacity: pressed ? 0.5 : 1 },
                        ]}
                        onPress={onPress}
                    >
                    </Pressable>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pos: {
        flex: 1,
        flexDirection: 'column-reverse'
    },
    background: {
        backgroundColor: '#00000050',
        height: '10%',
    },
    position: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnShot: {
        height: '85%',
        width: '15%',
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#000000',
        borderRadius: 50,
    },
})
