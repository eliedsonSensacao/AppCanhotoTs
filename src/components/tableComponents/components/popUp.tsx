import React from 'react';
import { View, Text, Modal, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view';

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
                    <View>
                        <ReactNativeZoomableView
                            maxZoom={3}
                            minZoom={1}
                            zoomStep={0.5}
                            initialZoom={1}
                            bindToBorders={true}
                        >
                            <Image
                                source={{ uri: image }}
                                style={styles.image}
                                resizeMode='stretch'
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
    image: {
        width: '90%',
        height: '50%',
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
