
import BarCodeButton from '@/src/components/CameraComponents/Buttons/BarCodeButton';
import CamButton from '@/src/components/CameraComponents/Buttons/imgCamButton';
import { RefreshControl, ScrollView } from 'react-native-gesture-handler';
import { useNotasContext } from '@/src/Context/notaContext';
import InfoDisplay from '@/src/components/FormComponents/display';
import { StyleSheet, View, Alert } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import SaveButton from '@/src/components/FormComponents/buttons/saveButton';


export default function SendForm() {
  const navigation = useRouter()
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const { clearDadosNota } = useNotasContext()

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
        <SaveButton />
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
    marginVertical: '10%',
    alignSelf: 'center'
  }

})
