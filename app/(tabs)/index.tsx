import { Image, StyleSheet, View } from 'react-native';


export default function HomeScreen() {
  return (
    <View style={Styles.container}>
      <Image
        source={require('@/assets/images/logo.png')}
        style={Styles.logo}
      />
    </View>
  );
}

const Styles = StyleSheet.create(
  {
    // config container geral
    container: {
      flex: 1,
      backgroundColor: '#0090CE',
      alignItems: 'center',
      justifyContent: 'center',
    },

    // config da imagem da logo
    logo: {
      width: '100%',
      height: '30%',
    },

  }
)

