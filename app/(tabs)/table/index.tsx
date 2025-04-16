import { Alert, FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View, ListRenderItem } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ImagePopup } from '@/src/components/screenComponents/table/components/popUp';
import { chk_files_to_del } from '@/src/data/local/storage/utils/file/chkFilesToDel';
import { useRouter } from 'expo-router';
import { local_file_list } from '@/src/data/local/storage/utils/file/fileListManager';
import { AppPhoto } from '@/src/data/utils/models/appPhoto';
import { FileInfo } from '@/src/data/utils/interfaces/interfaces';
import { windowWidth } from '@/src/functions/utils/getScreenDimensions';
import AntDesign from '@expo/vector-icons/AntDesign';

type TableRowProps = {
    item: FileInfo;
    index: number;
    showPopup: (index: number) => void;
    visible: boolean;
    closePopup: () => void;
};

const COLORS = {
    primary: '#0090CE',
    secondary: '#FFD749',
    white: '#fff',
    black: '#000',
};

const TableHeader: React.FC = () => (
    <View style={Styles.listRow}>
        <Text style={[Styles.title, Styles.listCell]}>Status</Text>
        <Text style={[Styles.title, Styles.listCell]}>Nota Fiscal</Text>
        <Text style={[Styles.title, Styles.listCell]}>Série</Text>
        <Text style={[Styles.title, Styles.listCell]}>CNPJ</Text>
        <Text style={[Styles.title, Styles.listCell]}>Foto</Text>
    </View>
);

const TableRow: React.FC<TableRowProps> = ({ item, index, showPopup, visible, closePopup }) => (
    <View style={Styles.listRow}>
        <Text style={[Styles.text, Styles.listCell]}>{item.status}</Text>
        <Text style={[Styles.text, Styles.listCell]} >{item.nNota}</Text>
        <Text style={[Styles.text, Styles.listCell]}>{item.serie}</Text>
        <Text style={[Styles.text, Styles.listCell]}>{item.cnpj}</Text>
        <Pressable
            key={index}
            onPress={() => showPopup(index)}
            style={({ pressed }) => [
                Styles.listCell, Styles.text,
                { opacity: pressed ? 0.5 : 1 }
            ]}
        >
            <AntDesign name="picture" size={30} color="black" />

        </Pressable>
        <ImagePopup
            visible={visible}
            closePopup={closePopup}
            image={item.uri}
        />
    </View>
);

export default function Table() {
    const navigation = useRouter();
    const [data, setData] = useState<FileInfo[]>([]);
    const [visible, setVisible] = useState<number | null>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const showPopup = useCallback((index: number) => {
        setVisible(index);
    }, []);

    const closePopup = useCallback(() => {
        setVisible(null);
    }, []);

    const fetchData = useCallback(async () => {
        try {
            const file_list = await local_file_list();
            let infoList: FileInfo[] = [];
            for (const file of file_list) {
                const [cnpj, nota] = file.split('.')[0].split('_');
                const appPhoto = new AppPhoto(cnpj, nota);
                const info: FileInfo = await appPhoto.get_image_info();
                infoList.push(
                    info
                )
            }
            setData(infoList);
            setIsRefreshing(false);
        } catch (error) {
            Alert.alert('Erro:', error instanceof Error ? error.message : 'Unknown error');
        }
    },
        []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const onRefresh = useCallback(async () => {
        if (isRefreshing) return;

        setIsRefreshing(true);
        try {
            await chk_files_to_del();
            //await send_data_to_server();
            fetchData();
            navigation.navigate('/(tabs)/table')
        } catch (err) {
            Alert.alert('Erro', `Não foi possível atualizar os dados\n${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsRefreshing(false);
        }
    }, [isRefreshing, navigation]);

    const renderItem: ListRenderItem<FileInfo> = useCallback(({ item, index }) => (
        <TableRow
            item={item}
            index={index}
            showPopup={showPopup}
            visible={visible === index}
            closePopup={closePopup}
        />
    ), [visible, showPopup, closePopup]);

    return (
        <View style={Styles.container}>
            <ScrollView
                style={Styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={onRefresh}
                        colors={[COLORS.secondary, COLORS.white]}
                        progressBackgroundColor={COLORS.primary}
                    />
                }
            >
                <FlatList
                    style={Styles.flatList}
                    pointerEvents='box-only'
                    ListHeaderComponent={<TableHeader />}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.uri}
                    removeClippedSubviews={true}
                    maxToRenderPerBatch={10}
                    windowSize={10}
                    initialNumToRender={10}
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={true}

                />
            </ScrollView >
        </View >
    );
};


const Styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    scrollView: {
        width: '100%',
        height: '100%',
        flexGrow: 1,
    },
    flatList: {
        flexGrow: 1,
        height: '90%',
        minWidth: windowWidth(150),
        marginHorizontal: 10,
        marginVertical: '10%',
        borderRadius: 5
    },
    listRow: {
        flex: 1,
        width: '100%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.black,

    },
    listCell: {
        textAlign: 'center',
        alignItems: 'center',
        width: '20%',
        paddingVertical: '1%',

    },
    title: {
        fontWeight: 'bold',
        backgroundColor: COLORS.secondary
    },
    text: {
        backgroundColor: COLORS.white
    }

});


// const Styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         height: '100%',
//         width: '100%',
//         backgroundColor: COLORS.primary,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     tblPos: {
//         width: '90%',
//         marginVertical: '10%',
//         borderRadius: 5,
//         backgroundColor: COLORS.secondary,
//     },
//     flatList: {
//         flexGrow: 1,
//         height: '90%',
//         minWidth: '100%',
//         backgroundColor: COLORS.white,
//     },
//     tabBody: {
//         backgroundColor: COLORS.primary,
//         width: '100%'
//     },
//     rowStyle: {
//         backgroundColor: COLORS.white,
//         flexDirection: 'row',
//         minWidth: '100%',
//     },
//     cell: {
//         textAlign: 'center',
//         alignItems: 'center',
//         paddingVertical: '1.5%',
//         minWidth: '20%',
//     },
//     title: {
//         fontWeight: 'bold',
//         backgroundColor: COLORS.secondary,
//         borderBottomColor: COLORS.black,
//         borderBottomWidth: 1
//     },
// });
