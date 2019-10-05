import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Text, Image, KeyboardAvoidingView, Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';


import api from '../services/api'
import logo from '../assets/logo.png';
// import { Container } from './styles';

export default function Login({ navigation }) {

    const [email, setEmail] = useState('');
    const [techs, setTechs] = useState('');

    useEffect(()=>{
        AsyncStorage.getItem('user').then(user => {
            if (user) {
                navigation.navigate('List');
            }
        })//usuário logado

    },[]);

    async function handleSubmit() {
        const response = await api.post('/sessions', {
            email
        });

        const { _id } = response.data;

        console.log(_id, techs)

        await AsyncStorage.setItem('user', _id);
        await AsyncStorage.setItem('techs', techs);

        mavigation.navigate('List')
    }
  return (
  <KeyboardAvoidingView 
//enabled={Platform.OS=='ios'} comentado pq esta no expo
  behavior='padding'
  style={styles.container}>
    <Image source={logo}></Image>

    <View style={styles.form}>
        <Text style={styles.label}>SEU E-MAIL</Text>
        <TextInput
            style={styles.input}
            placeholder="Seu e-mail"
            placeholderTextColor="#999"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={email}
            //nao usa onChange => onChangeText
            onChangeText={setEmail}
        />

        <Text style={styles.label}>TECNOLOGIAS</Text>
        <TextInput
            style={styles.input}
            placeholder="Tecnologias do seu interesse"
            placeholderTextColor="#999"
            autoCapitalize="words"
            autoCorrect={false}
            value={techs}
            onChangeText={setTechs}
        />
        <TouchableOpacity onPress={handleSubmit} style={styles.btnDo}>
            <Text style={styles.btnTxt}>Encontrar spots</Text>
        </TouchableOpacity>
    </View>    
    
  </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({ 
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
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
        marginBottom: 28,
        borderRadius: 2
    },
    btnDo: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
    },
    btnTxt:{
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    }
})
