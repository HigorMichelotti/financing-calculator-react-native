import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from 'react-native';
import { TextInput } from "react-native-gesture-handler";
import { Picker } from '@react-native-picker/picker';
import { useRef } from 'react';
import { useState } from 'react';

export default function SimulacaoFinanciamento() {
    const listRef = useRef<ScrollView>(null);

    const [valorFinanciamento, setValorFinanciamento] = useState('R$ 0.00')

    const [valorParcela, setValorParcela] = useState('R$ 0.00')
    const [valorTotal, setValorTotal] = useState('R$ 0.00')
    const [valorTotalJuros, setValorTotalJuros] = useState('R$ 0.00')

    const [valorAvista, setValorAvista] = useState('')
    const [valorEntrada, setValorEntrada] = useState('')
    const [tipoEntrada, setTipoEntrada] = useState('porcentagem')

    const [valorTaxaJuros, setValorTaxaJuros] = useState('')
    const [tipoTaxaJuros, setTipoTaxaJuros] = useState('aoMes')

    const [quantidadeParcelas, setQuantidadeParcelas] = useState('')

    function calcularFinanciamento() {
        var valorSemEntrada = 0;

        if (tipoEntrada == 'reais')
            valorSemEntrada = obterValorFinanciadoSemEntradaEmReais();
        else if (tipoEntrada == 'porcentagem')
            valorSemEntrada = obterValorFinanciadoSemEntradaEmPorcentagem();

        var taxaDeJuros = 0
        if (tipoTaxaJuros == 'aoMes') {
            var taxaDeJuros = Number(valorTaxaJuros) / 100
        }

        else if (tipoTaxaJuros == 'aoAno') {
            taxaDeJuros = (Number(valorTaxaJuros) / 12) / 100;
            console.log('taxaDeJuros', taxaDeJuros)
        }
        var juros = (valorSemEntrada * taxaDeJuros)
        var valorParcelaComJuros = (juros) / (1 - (1 / (1 + taxaDeJuros) ** Number(quantidadeParcelas)))

        var totalDeJuros = 0;
        var saldoDevedor = valorSemEntrada;

        for (let index = 0; index < Number(quantidadeParcelas); index++) {
            var juros = (saldoDevedor * taxaDeJuros)
            var valorAmortizacao = valorParcelaComJuros - juros
            totalDeJuros += juros
            saldoDevedor -= valorAmortizacao
        }

        setValorFinanciamento(currencyFormat(valorSemEntrada))
        setValorParcela(currencyFormat(valorParcelaComJuros))
        setValorTotal(currencyFormat(totalDeJuros + valorSemEntrada))
        setValorTotalJuros(currencyFormat(totalDeJuros))

        listRef.current?.scrollTo({ x: 0, y: 0, animated: true })
    }

    function currencyFormat(num: number) {
        return 'R$ ' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }

    function obterValorFinanciadoSemEntradaEmReais(): number {
        if (!valorEntrada) return 0;
        return Number(valorAvista) - Number(valorEntrada)
    }

    function obterValorFinanciadoSemEntradaEmPorcentagem(): number {
        if (!valorEntrada) return 0;

        var valorAvistaNumber = Number(valorAvista);
        var valorEntradaNumber = Number(valorEntrada);

        return valorAvistaNumber - (valorAvistaNumber * valorEntradaNumber / 100)
    }

    return (
        <ScrollView style={styles.container} ref={listRef}>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <View style={styles.containerResultado}>
                    <TouchableOpacity style={styles.itemContainerResultado}>
                        <Text style={styles.textValoresTotais}>Valor a financiar</Text>
                        <Text style={styles.valoresTotais}>{valorFinanciamento}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainerResultado}>
                        <Text style={styles.textValoresTotais}>Valor da parcela</Text>
                        <Text style={styles.valoresTotais}>{valorParcela}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.containerResultado}>
                    <TouchableOpacity style={styles.itemContainerResultado}>
                        <Text style={styles.textValoresTotais}>Total de juros</Text>
                        <Text style={styles.valoresTotais}>{valorTotalJuros}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.itemContainerResultado}>
                        <Text style={styles.textValoresTotais}>Valor a ser pago</Text>
                        <Text style={styles.valoresTotais}>{valorTotal}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.containerFomulario}>
                <View>
                    <Text style={styles.textForm}>Valor à vista</Text>
                    <TextInput
                        onChangeText={text => setValorAvista(text)}
                        value={valorAvista}
                        style={styles.inputForm}
                        keyboardType='numeric' />
                    <Text style={styles.textForm}>Entrada (Opcional)</Text>
                    <View style={styles.viewEmLinha}>
                        <TextInput
                            onChangeText={text => setValorEntrada(text)}
                            value={valorEntrada}
                            style={styles.inputValorEntradaForm}
                            keyboardType='numeric' />
                        <View style={styles.selectEntradaForm}>
                            <Picker
                                selectedValue={tipoEntrada}
                                onValueChange={(itemValue) => setTipoEntrada(itemValue)}>
                                <Picker.Item style={styles.itemPicker} key={'porcentagem'} label={'%'} value={'porcentagem'} />
                                <Picker.Item style={styles.itemPicker} key={'reais'} label={'R$'} value={'reais'} />
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.textForm}>Taxa de juros</Text>
                    <View style={styles.viewEmLinha}>
                        <TextInput
                            onChangeText={text => setValorTaxaJuros(text)}
                            value={valorTaxaJuros}
                            style={styles.inputTaxaJurosForm}
                            keyboardType='numeric' />

                        <View style={styles.selectJurosForm}>
                            <Picker
                                selectedValue={tipoTaxaJuros}
                                onValueChange={(itemValue) => setTipoTaxaJuros(itemValue)}>
                                <Picker.Item style={styles.itemPicker} key={'aoMes'} label={'ao mês (a.m)'} value={'aoMes'} />
                                <Picker.Item style={styles.itemPicker} key={'aoAno'} label={'ao ano (a.a)'} value={'aoAno'} />
                            </Picker>
                        </View>
                    </View>

                    <Text style={styles.textForm}>Número de parcelas</Text>
                    <TextInput
                        onChangeText={text => setQuantidadeParcelas(text)}
                        value={quantidadeParcelas}
                        style={styles.inputForm}
                        keyboardType='numeric' />

                </View>
            </View>

            <TouchableOpacity style={styles.buttonCalcular} onPress={() => calcularFinanciamento()}>
                <Text style={styles.textButtonCalcular}>Calcular</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3f5856',
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 15,
        height: '100%',
    },

    containerFomulario: {
        marginTop: 15,
        padding: 25,
        backgroundColor: '#fff',
        borderRadius: 10
    },

    containerResultado: {
        flexDirection: 'row',
    },

    itemContainerResultado: {
        borderWidth: 1,
        borderColor: '#9393936b',
        margin: 5,
        borderRadius: 10,
        width: '45%',
        padding: 15,
        alignItems: 'center'
    },

    textForm: {
        color: '#c37735',
        marginTop: 15,
        marginBottom: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    inputForm: {
        borderRadius: 50,
        backgroundColor: '#f6f6f6',
        padding: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    inputValorEntradaForm: {
        width: '70%',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        backgroundColor: '#f6f6f6',
        padding: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    inputTaxaJurosForm: {
        width: '50%',
        backgroundColor: '#f6f6f6',
        borderTopLeftRadius: 50,
        borderBottomLeftRadius: 50,
        padding: 10,
        fontFamily: 'Montserrat_400Regular'
    },

    selectEntradaForm: {
        width: '30%',
        borderBottomEndRadius: 50,
        borderTopEndRadius: 50,
        backgroundColor: '#efefef',
    },

    selectJurosForm: {
        width: '50%',
        borderBottomEndRadius: 50,
        borderTopEndRadius: 50,
        backgroundColor: '#efefef',
    },

    itemPicker: {
        color: '#4f4f4f', //#3b3b3b
        fontSize: 13
    },

    buttonCalcular: {
        backgroundColor: '#c37735',
        borderRadius: 10,
        marginTop: 25,
        marginBottom: 35,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
    },

    textButtonCalcular: {
        fontSize: 20,
        color: '#fff',
        fontFamily: 'Montserrat_400Regular'
    },

    viewEmLinha: {
        flexDirection: 'row'
    },

    textValoresTotais: {
        fontSize: 13,
        color: 'white',
        fontFamily: 'Montserrat_400Regular'
    },

    valoresTotais: {
        fontSize: 17,
        color: '#c37735',
        fontFamily: 'Montserrat_400Regular'
    }

});