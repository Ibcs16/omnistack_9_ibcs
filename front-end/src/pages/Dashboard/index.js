import React, { useState, useEffect } from 'react';
import {Link} from  'react-router-dom';
import api from '../../services/api'
import './styles.css'


export default function Dashboard() {
    const [spots, setSpots] = useState([])

   useEffect(() => {
     async function loadSpots(){
        const user_id = localStorage.getItem('user');
        const res = await api.get('/dashboard',
           { headers: {user_id} }
        );

        console.log(res.data)
        setSpots(res.data);
     }

     loadSpots();
   }, [])
    return (
        <>
           <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{backgroundImage: `url(${spot.thumbnail_url})`}}/>
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'gratuito'}</span>
                    </li>
                ))}
           </ul>
 
           <button className="formBtn do"><Link className="linkToPage" to="/new">Cadastrar novo spot</Link></button>
        </>
    )
}