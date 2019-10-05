import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, ScrollView, Image, AsyncStorage, Text } from 'react-native';
import socketio from 'socket.io-client';

import logo from '../assets/logo.png';


import SpotList from '../components/SpotList'

export default function List(){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.31.26:3333');

            socket.on('booking_response', booking => {
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved?'APROVADA':'REJEITADA'}`)
            });
        })
    });


    useEffect(() => {
        AsyncStorage.getItem('techs').then(storageTechs => {
            const techsArray = storageTechs.split(',').map(tech => tech.trim());
            
           
            setTechs(techsArray)
        })
    }, []);

    return (
    <SafeAreaView style={styles.container}>
        <Image style={styles.logo}
        source={logo}/>

        <ScrollView  
            showsVerticalScrollIndicator={false}>
            {techs.map(tech => <SpotList key={tech} tech={tech}/>)}
        </ScrollView>
    </SafeAreaView>
)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        marginTop: 20,
        alignSelf: 'center'
    }
});
