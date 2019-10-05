import React, {useState} from 'react';
import { SafeAreaView, Alert, Text, StyleSheet, TextInput, Button, AsyncStorage, TouchableOpacity } from 'react-native';
import api from '../services/api'

export default function Book({navigation}){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){

        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        },{
            headers:{user_id}
        });

        Alert.alert("Solicitação de reserva enviada");


        navigation.navigate('List');

    }


    function handleCancel() {
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style={styles.container}>
             <Text style={styles.label}>DATA DA RESERVA</Text>
            <TextInput
                style={styles.input}
                placeholder="Qual data de reserva?"
                placeholderTextColor="#999"
                keyboardType="numeric"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                //nao usa onChange => onChangeText
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={[styles.btn,styles.btnDo]}>
                <Text style={styles.btnTxt}>Confirmar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.btn,styles.btnCancel]}>
                <Text style={styles.btnTxt}>Cancelar</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
    },
    label: {
        marginTop: 50,
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 23,
        borderRadius: 2
    },

    btn: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginBottom: 10,
    },

    btnDo: {
        backgroundColor: '#f05a5b',
    },

    btnCancel: {
        backgroundColor: '#ddd',
    },

    btnTxt:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
})
