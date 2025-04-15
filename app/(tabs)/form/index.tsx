
import BarCodeButton from '@/src/components/CameraComponents/Buttons/BarCodeButton';
import CamButton from '@/src/components/CameraComponents/Buttons/imgCamButton';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useNotasContext } from '@/src/Context/notaContext';
import InfoDisplay from '@/src/components/FormComponents/display';
import { StyleSheet, View, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import SaveButton from '@/src/components/globalComponents/buttons/Button';
import { useState } from 'react';
import { useLoading } from '@/src/Context/loadingContext';
import { AppPhoto } from '@/src/data/utils/models/appPhoto';
import ComponentButton from '@/src/components/globalComponents/buttons/Button';


export default function SendForm() {
  const navigation = useRouter()
  const { clearDadosNota, dadosNota } = useNotasContext()
  const { setIsLoading } = useLoading();
  const [isRefreshing, setIsRefreshing] = useState(false);


  const onRefresh = async () => {
    try {
      setIsRefreshing(true)
      clearDadosNota();
      navigation.replace('/(tabs)/form')
    } catch (err: any) {
      Alert.alert('Erro ao atualizar a página.', err.message)
    } finally {
      setIsRefreshing(false)
    }
  }

  const salvar = async () => {
    try {
      setIsLoading(true);
      if (!dadosNota.cnpj || !dadosNota.n_nota || !dadosNota.img_uri) {
        throw new Error("Não há dados para salvar")
      }
      const photo = new AppPhoto(dadosNota.cnpj, dadosNota.n_nota, dadosNota.img_uri);
      await photo.store();
    } catch (err: any) {
      Alert.alert("Erro ao salvar imagem", err.message)
      return;
    } finally {
      clearDadosNota()
      navigation.replace('/(tabs)/form')
      setIsLoading(false)
    }
  }

  return (
    <ScrollView
      style={Styles.container}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh}
          refreshing={isRefreshing}
          colors={['#ffc801', '#ffffff']}
          progressBackgroundColor="#0090ced6"
        />
      }>

      {/* Informações da nota */}
      <View style={Styles.infoDisplay}>
        <InfoDisplay />
      </View>

      {/* Botão Cod Bar */}
      <View style={Styles.btnBarPos}>
        <BarCodeButton />
      </View>

      {/* Botão Camera */}
      <View style={Styles.btnCamPos}>
        <CamButton />
      </View>
      {/* Botão Salvar */}
      <View style={Styles.btnSavePos}>
        <ComponentButton text='Salvar' onPress={salvar} />
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#0090CE'
  },
  // posicao do display
  infoDisplay: {
    flex: 4,
    width: '100%',
    marginTop: '20%',
    marginBottom: "10%"
  },
  // botao Cod Bar
  btnBarPos: {
    flex: 1,
    width: '75%',
    height: '10%',
    alignSelf: 'center',
    marginBottom: '2%'
  },
  // Botao Camera
  btnCamPos: {
    flex: 2,
    width: '75%',
    alignSelf: 'center',
    height: 250
  },
  // botao Salvar
  btnSavePos: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: '3%'
  }

})
