import { FlatList, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View, ListRenderItem } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ImagePopup } from '@/src/components/screenComponents/table/components/popUp';
import { chk_files_to_del } from '@/src/data/local/storage/utils/file/chkFilesToDel';
import { useRouter } from 'expo-router';
import { local_file_list } from '@/src/data/local/storage/utils/file/fileListManager';
import { FileInfo } from '@/src/data/utils/interfaces/interfaces';
import { windowWidth } from '@/src/functions/utils/getScreenDimensions';
import AntDesign from '@expo/vector-icons/AntDesign';
import Toast from 'react-native-toast-message';
import { AppPhoto } from '@/src/data/local/models/appPhoto';
import StyledText from '@/src/components/globalComponents/StyledText';

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
        <StyledText style={[Styles.listCell, Styles.titleBackground]} type='title'>Status</StyledText>
        <StyledText style={[Styles.listCell, Styles.titleBackground]} type='title'>Nota Fiscal</StyledText>
        <StyledText style={[Styles.listCell, Styles.titleBackground]} type='title'>Série</StyledText>
        <StyledText style={[Styles.listCell, Styles.titleBackground]} type='title'>CNPJ</StyledText>
        <StyledText style={[Styles.listCell, Styles.titleBackground]} type='title'>Foto</StyledText>
    </View>
);

const TableRow: React.FC<TableRowProps> = ({ item, index, showPopup, visible, closePopup }) => (
    <View style={Styles.listRow}>
        <StyledText style={[Styles.itemBackground, Styles.listCell]} type='subtitle'>{item.status}</StyledText>
        <StyledText style={[Styles.itemBackground, Styles.listCell]} type='subtitle'>{item.nNota}</StyledText>
        <StyledText style={[Styles.itemBackground, Styles.listCell]} type='subtitle'>{item.serie}</StyledText>
        <StyledText style={[Styles.itemBackground, Styles.listCell]} type='subtitle'>{item.cnpj}</StyledText>
        <Pressable
            key={index}
            onPress={() => showPopup(index)}
            style={({ pressed }) => [
                Styles.listCell, Styles.itemBackground,
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
    const [count, setCount] = useState<number>(0)

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
        } catch (err) {
            if (err instanceof Error) {
                throw err
            } else {
                throw new Error(`Erro desconhecido ao buscar dados`)
            }
        }
    },
        []);

    useEffect(() => {
        console.log(count)
        fetchData();
        if (count <= 3) {
            Toast.show({ type: 'info', text1: 'Arraste para baixo para enviar notas' })
            setCount(count + 1)
        }
        console.log(count)
    }, [fetchData]);

    const onRefresh = useCallback(async () => {
        if (isRefreshing) return;
        try {
            setIsRefreshing(true);
            await chk_files_to_del();
            fetchData();
            //await send_data_to_server();
            navigation.navigate('/(tabs)/table')
        } catch (err) {
            if (err instanceof Error) {
                Toast.show({ type: 'error', text1: 'Erro', text2: err.message })
            } else {
                Toast.show({ type: 'error', text1: 'Erro', text2: 'Erro desconhecido ao atualizar' })
            }
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
    titleBackground: {
        backgroundColor: COLORS.secondary
    },
    itemBackground: {
        backgroundColor: COLORS.white
    }
});
