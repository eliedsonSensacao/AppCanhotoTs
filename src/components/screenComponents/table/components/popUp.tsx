import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';
import { windowHeight, windowWidth } from '@/src/functions/utils/getScreenDimensions';

interface ImagePopupProps {
    visible: boolean;
    closePopup: () => void;
    image: string;
}

export const ImagePopup: React.FC<ImagePopupProps> = ({ visible, closePopup, image }) => {
    return (
        <View style={styles.container}>
            <Modal
                visible={visible}
                animationType='none'
                onRequestClose={closePopup}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.imageView}>
                        <ReactNativeZoomableView
                            maxZoom={8}
                            minZoom={1}
                            zoomStep={0.5}
                            initialZoom={1}
                            bindToBorders={true}
                        >
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode='contain'
                            />
                        </ReactNativeZoomableView>
                        <TouchableOpacity onPress={closePopup} style={styles.button}>
                            <Text style={styles.buttonText}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#020638"
    },
    imageView: {
        width: windowWidth(100),
        height: windowHeight(100),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
        alignItems: 'center',
        paddingVertical: '2%',
        marginHorizontal: '30%',
        marginVertical: '5%',
        borderRadius: 2
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
