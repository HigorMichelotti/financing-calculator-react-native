import { NavigationContainer, Theme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SimulacaoFinanciamento from './src/pages/simulacao-financiamento/simulacao-financiamento';
import { useFonts, Montserrat_400Regular } from '@expo-google-fonts/montserrat';
import { SimpleLineIcons } from '@expo/vector-icons';
import Sobre from './src/pages/sobre/sobre';


type RootStackParamList = {
  Simulacao: undefined;
  Sobre: undefined;
};

const MyTheme: Theme = {
  dark: false,
  colors: {
    primary: '#60965a',
    background: '#f1f1f1',
    card: '#3f5856',
    text: '#363636',
    border: '#9b9b9b',
    notification: '#60965a',
  },
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular
  });

  if (fontsLoaded) {
    return (
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator initialRouteName='Simulacao'>
          <Stack.Screen name="Simulacao" component={SimulacaoFinanciamento}
            options={({ navigation }: any) => ({
              title: 'Simulação',
              headerTitleStyle: {
                fontFamily: 'Montserrat_400Regular',
                color: '#fff',
                borderBottomColor: 'red'
              },
              headerStyle: {
                backgroundColor: '#3f5856',
              },
              headerRight: () => (
                <View>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Sobre')}
                    style={styles.btnSobre}>
                    <SimpleLineIcons name="question" size={20} color="white" />
                  </TouchableOpacity>
                </View>
              ),
            })}
          />
          <Stack.Screen name="Sobre" component={Sobre} options={{
            headerTitleAlign: 'left',
            headerTitleStyle: {
              fontFamily: 'Montserrat_400Regular',
              color: '#fff',
              borderBottomColor: 'red'
            },
            headerStyle: {
              backgroundColor: '#3f5856',
            },
          }} />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    );
  } else {
    return <View></View>
  }
}

const styles = StyleSheet.create({
  btnSobre: {
    marginRight: 15,
  },
});