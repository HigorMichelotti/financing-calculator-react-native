import { Linking, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Entypo } from '@expo/vector-icons';

export default function Sobre() {
    return (
        <View style={styles.container}>
            <View style={styles.containerVerde}>
                <Text style={styles.titulo}>Simulador de financiamento</Text>
                <Text style={styles.subTitulo}>By - Higor Michelotti</Text>
                <View style={styles.viewSobre}>
                    <Text style={styles.textSobre}>Está aplicação foi desenvolvida com o intuito de estudar os conceitos básicos do react-native com expo.</Text>
                    <View
                        style={styles.linhaOrizontal}
                    />

                    <Text style={styles.textSobreApi}>Os calculos feitos para simulação estão disponibilisados no github do projeto
                        <Text style={{ color: '#c37735' }} onPress={() => Linking.openURL('https://free.currencyconverterapi.com/')}> aqui</Text>
                    </Text>

                    <Text style={styles.textSobreDesenvolvedor}>Sobre o desenvolvedor</Text>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://github.com/HigorMichelotti')}>
                        <AntDesign name="github" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://github.com/HigorMichelotti</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://www.linkedin.com/in/higormichelotti/')}>
                        <Entypo name="linkedin-with-circle" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://www.linkedin.com/in/higormichelotti/</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://www.instagram.com/higor_michelotti/')}>
                        <AntDesign name="instagram" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://www.instagram.com/higor_michelotti/</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.viewIcones} onPress={() => Linking.openURL('https://hdtecsolucoes.com.br/')}>
                        <Entypo name="network" size={22} color="black" />
                        <Text style={styles.textIconesLink}>https://hdtecsolucoes.com.br/</Text>
                    </TouchableOpacity>

                    {/* <Text>Abrir projeto no Github</Text> */}

                </View>
            </View >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        height: '60%'
    },
    titulo: {
        color: '#c37735',
        textAlign: 'center',
        fontSize: 25,
        fontFamily: 'Montserrat_400Regular'
    },
    subTitulo: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 13,
        fontFamily: 'Montserrat_400Regular',
    },
    containerVerde: {
        backgroundColor: '#3f5856',
        paddingTop: 20,
        height: '100%'
    },
    viewSobre: {
        backgroundColor: "#fff",
        marginTop: 50,
        marginLeft: 10,
        marginRight: 10,
        height: '135%',
        borderRadius: 10,
        padding: 20
    },
    textSobre: {
        fontFamily: 'Montserrat_400Regular',
        color: '#868686'
    },
    textSobreApi: {
        fontFamily: 'Montserrat_400Regular',
    },
    linhaOrizontal: {
        borderBottomColor: '#d1d1d1',
        borderBottomWidth: 0.9,
        marginTop: 20,
        marginBottom: 20
    },
    textSobreDesenvolvedor: {
        fontFamily: 'Montserrat_400Regular',
        color: '#c37735',
        fontSize: 20,
        marginTop: 25
    },
    viewIcones: {
        marginTop: 30,
        flexDirection: 'row'
    },
    textIconesLink: {
        color: '#868686',
        marginLeft: 10,
        marginTop: 2
    }
});
