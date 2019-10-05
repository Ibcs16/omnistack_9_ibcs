import React, { useState, useEffect, useMemo } from 'react';
import {Link} from  'react-router-dom';
import api from '../../services/api'
import socketio from 'socket.io-client'

import './styles.css'

//useMemo memorizar valor de variavel até que algo mude

export default function Dashboard() {
    const [spots, setSpots] = useState([])
    const [requests, setRequests] = useState([])

    const user_id = localStorage.getItem('user');
    const socket = useMemo(() => socketio('http://localhost:3333', {
        query: { user_id }
    }), [user_id]);

    async function handleRequest(id, accept){
        if(accept){
            await api.post(`/bookings/${id}/approvals`,{
                headers: { user_id }
            });
    
        }else{
            await api.post(`/bookings/${id}/rejections`,{
                headers: { user_id }
            });
        }

            setRequests(requests.filter(request => request._id !== id));
    }


    useEffect(() => {
        
        socket.on('booking_request', data => {
            
            setRequests([...requests, data]);
        })
       
    },[requests, socket])


   useEffect(() => {
     async function loadSpots(){
        const user_id = localStorage.getItem('user');
        const res = await api.get('/dashboard',
           { headers: {user_id} }
        );

        setSpots(res.data);
     }

     loadSpots();
   }, [])
    return (
        <>
        <ul className="notifications">
            {requests.map(request => (
                <li key={request._id}>
                    <p>
                        <strong>{request.user.email}</strong> está solicitando uma reserva em<strong> {request.spot.company} </strong>na data de<strong> {request.date} </strong>
                    </p>
                    <button onClick={()=>handleRequest(request._id, true)} className="btnRequest btnAccept">ACEITAR</button>
                    <button onClick={() => handleRequest(request._id, false)} className="btnRequest btnDecline">REJEITAR</button>
                </li>
            ))
            }
        </ul>
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