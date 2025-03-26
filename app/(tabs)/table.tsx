import { Alert, FlatList, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState, useEffect, useCallback, memo } from 'react';
import { useRouter } from 'expo-router';
import { local_file_list } from '@/src/data/local/storage/utils/file/fileListManager';
import { chk_files_to_del } from '@/src/data/local/storage/utils/file/chkFilesToDel';
import { ImagePopup } from '@/src/components/tableComponents/components/popUp';

const COLORS = {
    primary: '#0090CE',
    secondary: '#FFD749',
    white: '#fff',
    black: '#000',
};

const TableHeader = memo(() => (
    <View style={Styles.rowStyle}>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Status</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Nota</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Série</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>CNPJ</Text>
        <Text style={[Styles.title, Styles.cell, Styles.titleText]}>Imagem</Text>
    </View>
));

interface TableRowProps {
    item: string;
    index: number;
    showPopup: (index: number) => void;
    visible: boolean;
    closePopup: () => void;
}

const TableRow: React.FC<TableRowProps> = memo(({ item, index, showPopup, visible, closePopup }) => (
    <View style={Styles.tabBody}>
        <View style={Styles.rowStyle}>
            <TextInput
                style={[Styles.data, Styles.cell]}
                value="Status" // Placeholder value
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value="Nota" // Placeholder value
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value="Série" // Placeholder value
                editable={false}
            />
            <TextInput
                style={[Styles.data, Styles.cell]}
                value="CNPJ" // Placeholder value
                editable={false}
            />
            <Pressable
                onPress={() => showPopup(index)}
                style={[Styles.data, Styles.cell]}
            >
                <Image
                    source={{ uri: item }}
                    style={{ paddingVertical: 0, width: '30%', height: '15%' }}
                />
            </Pressable>
            <ImagePopup
                visible={visible}
                closePopup={closePopup}
                image={item}
            />
        </View>
    </View>
));

const Table: React.FC = () => {
    const navigation = useRouter();
    const [data, setData] = useState<string[]>([]);
    const [visible, setVisible] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try {
            const file_list = await local_file_list();
            setData(file_list);
        } catch (err: unknown) {
            if (err instanceof Error) {
                throw new Error(err.message);
            } else {
                throw new Error('Erro desconhecido ao buscar os dados da tabela.');
            }
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const showPopup = useCallback((index: number) => {
        setVisible(index);
    }, []);

    const closePopup = useCallback(() => {
        setVisible(0);
    }, []);

    const onRefresh = useCallback(async () => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            await chk_files_to_del();
            // >>>>>> await send_data_to_server();

            navigation.navigate('/(tabs)/table');
        } catch (err: unknown) {
            if (err instanceof Error) {
                Alert.alert('Não foi possivel buscar os dados', err.message);
            } else {
                throw new Error('Erro desconhecido ao buscar os dados da tabela.');
            }
        } finally {
            setIsLoading(false);
        }
    }, [isLoading, navigation]);

    const renderItem = useCallback(({ item, index }: { item: string; index: number }) => (
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
                keyExtractor={(item, index) => index.toString()}
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
        marginVertical: '0.5%',
        marginHorizontal: '3%'
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
        flexDirection: 'row',
        minWidth: '100%',
    },
    cell: {
        textAlign: 'center',
        width: '30%',
        paddingVertical: '1%',
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
        marginVertical: 0.5,
        borderBottomColor: COLORS.black,
        borderBottomWidth: 1,
        fontSize: 10,
        color: COLORS.black,
    },
});

export default Table;
