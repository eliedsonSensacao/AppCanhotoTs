import { Alert, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View, ListRenderItem } from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { ImagePopup } from '@/src/components/tableComponents/components/popUp';
import { chk_files_to_del } from '@/src/data/local/storage/utils/file/chkFilesToDel';
import { useRouter } from 'expo-router';
import { local_file_list } from '@/src/data/local/storage/utils/file/fileListManager';
import { AppPhoto } from '@/src/data/utils/models/appPhoto';

// Tipos
type TableItem = {
    status: string;
    nota: string;
    serie: string;
    cnpj: string;
    path: string;
    filename: string;
};

type TableRowProps = {
    item: TableItem;
    index: number;
    showPopup: (index: number) => void;
    visible: boolean;
    closePopup: () => void;
};

type TableHeaderProps = {};

// Constantes de cores
const COLORS = {
    primary: '#0090CE',
    secondary: '#FFD749',
    white: '#fff',
    black: '#000',
};

// Componente do Cabeçalho
const TableHeader: React.FC<TableHeaderProps> = () => (
    <View style={Styles.rowStyle}>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Status</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Nota Fiscal</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Série</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>CNPJ</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Foto</Text>
    </View>
);

// Componente de linha da tabela
const TableRow: React.FC<TableRowProps> = ({ item, index, showPopup, visible, closePopup }) => (
    <View style={Styles.tabBody}>
        <View style={Styles.rowStyle}>
            <TextInput
                style={[Styles.data, Styles.cell]}
                value={item.status}
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value={item.nota}
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value={item.serie}
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value={item.cnpj}
                editable={false}
            />
            <Pressable
                onPress={() => showPopup(index)}
                style={({ pressed }) => [
                    Styles.data,
                    Styles.cell,
                    { opacity: pressed ? 0.5 : 1 }
                ]}
            >
                <Image
                    source={{ uri: item.path }}
                    style={{ paddingVertical: 0, width: '20%', height: '10%' }}
                />
            </Pressable>
            <ImagePopup
                visible={visible}
                closePopup={closePopup}
                image={item.path}
            />
        </View>
    </View>
);

export default function Table() {
    const navigation = useRouter();
    const [data, setData] = useState<TableItem[]>([]);
    const [visible, setVisible] = useState<number | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const file_list = await local_file_list();
            for (const file of file_list) {
                const [cnpj, nota] = file.split('.')[0].split('_');
                const appPhoto = new AppPhoto(cnpj, nota)
                const info: FileInfo = await appPhoto.get_image_info();
                setData(prevState => [
                    ...prevState,
                    {
                        status: info.status,
                        nota: info.nNota,
                        serie: info.serie,
                        cnpj: info.cnpj,
                        path: info.uri,
                        filename: file,
                    }
                ]);


            }
        } catch (error) {
            console.error('Error fetching data:', error instanceof Error ? error.message : 'Unknown error');
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const showPopup = useCallback((index: number) => {
        setVisible(index);
    }, []);

    const closePopup = useCallback(() => {
        setVisible(null);
    }, []);

    const onRefresh = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            await chk_files_to_del();
            //await send_data_to_server();

            navigation.navigate('/(tabs)/table')
        } catch (err) {
            Alert.alert('Erro', `Não foi possível atualizar os dados\n${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, navigation]);

    const renderItem: ListRenderItem<TableItem> = useCallback(({ item, index }) => (
        <TableRow
            item={item}
            index={index}
            showPopup={showPopup}
            visible={visible === index}
            closePopup={closePopup}
        />
    ), [visible, showPopup, closePopup]);

    return (
        <ScrollView
            style={Styles.tblPos}
            horizontal={true}
        >
            <FlatList
                style={{ flex: 1 }}
                pointerEvents='box-only'
                ListHeaderComponent={<TableHeader />}
                data={data}
                renderItem={renderItem}
                keyExtractor={(item) => item.filename}
                removeClippedSubviews={true}
                maxToRenderPerBatch={10}
                windowSize={10}
                initialNumToRender={10}
                scrollEnabled={true}
                showsVerticalScrollIndicator={true}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={onRefresh}
                        colors={[COLORS.secondary, COLORS.white]}
                        progressBackgroundColor={COLORS.primary}
                    />
                }
            />
        </ScrollView>
    );
};

const Styles = StyleSheet.create({
    tblPos: {
        flex: 1,
        backgroundColor: COLORS.primary,
        paddingVertical: '10%',
        paddingHorizontal: '3%'
    },
    flatList: {
        flex: 1,

        width: '100%'
    },
    tabBody: {
        backgroundColor: COLORS.primary,
        width: "100%",
    },
    rowStyle: {
        backgroundColor: COLORS.white,
        width: '100%'
    },
    cell: {
        textAlign: 'center',
        width: '30%',
        paddingVertical: 10,
        minWidth: '30%',
    },
    title: {
        fontWeight: 'bold',
        backgroundColor: COLORS.secondary,
    },
    titleText: {
        width: '100%',
        textAlign: 'center'
    },
    data: {
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 1,
        fontSize: 10,
        color: COLORS.black,
    },
});
