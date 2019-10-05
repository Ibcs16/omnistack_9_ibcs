import React, { useState, useEffect } from 'react';

import { withNavigation} from 'react-navigation'

import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';

import api from '../services/api'


function SpotList({ tech , navigation}) {
    const [spots, setSpots] = useState([]);

    

    useEffect(() => {
        async function loadSpots(){
        
            const response = await api.get('/spots', {
                params: { tech }
            })

            


        }

        loadSpots()
        setSpots([
            {
            'company':'WheyCoding',
            'price': 29,
            'thumbnail_url': 'no_url',
            '_id':'022'
        },
        {
            'company':'CakeCoding',
            'price': 0,
            'thumbnail_url': 'no_url',
            '_id':'023'
        }
        ])

    },[]
    )


    function handleNavigate(id) {
        navigation.navigate('Book', { id });

    }
  return(
      <View style={styles.container}>
          <Text style={styles.title}>Empresas que usam <Text style={styles.techName}>{tech}</Text></Text>
            <FlatList
                style={styles.spotList}
                data={spots}
                keyExtractor={spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={
                    ({ item }) => (
                    <View style={styles.spotListItem}>
                        <Image style={styles.thumbnail} source={{uri: item.thumbnail_url}}/>
                        <Text style={styles.company}>{item.company}</Text>
                        <Text style={styles.price}>{item.price? `R$${item.price}/dia` : 'GRATUITO'}</Text>
                        <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.bookBtnDo}>
                            <Text style={styles.bookBtnText}>Solicitar reserva</Text>
                        </TouchableOpacity>
                    </View>
                )
                }
            />
      </View>
  )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 30,
    },
    title: {
        fontSize: 20,
        color: '#444',
        marginBottom: 15
    },
    techName: {
        fontWeight: 'bold'
    },
    spotList:{
        //paddingHorizontal: 20,
    },
    spotListItem: {
        marginRight: 15,

    },
    thumbnail: {
        width: 200,
        height: 120,
        resizeMode: 'cover',
        borderRadius: 2
    },
    company: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 10,
    },
    price: {
        fontSize: 15,
        color: '#999',
        marginTop: 5
    },

    bookBtnDo:{
        height: 32,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        marginTop: 15,
    },

    bookBtnText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
    }
})

export default withNavigation(SpotList);