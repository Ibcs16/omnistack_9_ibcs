import React, { useState, useMemo } from 'react';
import api from '../../services/api'
//useMemo todo vez que atualiza, faz algo


import cameraIcon from '../../assets/camera.svg'

import './styles.css'

export default function New({history}) {
    const [company, setCompany] = useState('');
    const [techs, setTechs] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail):null;
    },[thumbnail]);

    

   async function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData();

    const user_id = localStorage.getItem('user');

    data.append('thumbnail', thumbnail);
    data.append('techs', techs);
    data.append('company', company);
    data.append('price', price);

    await api.post('/spots', data, {
        headers: {user_id}
    })

    history.push('/dashboard')

   }

  
    return (
        <form onSubmit={handleSubmit}>
            <label 
            id="thumbnail" 
            style={{backgroundImage: `url(${preview})`}}
            className={thumbnail ? 'has-thumbnail':''}
            >
                <input onChange={event => setThumbnail(event.target.files[0])} type="file" />
                <img src={cameraIcon} alt="Select img"/>
            </label>

            <label htmlFor="company">Empresa</label>
            <input 
                type="text" 
                id="campany"
                value={company}
                onChange={event => setCompany(event.target.value)}
                placeholder="Sua empresa incrível"
                required
                />
            
            <label htmlFor="techs">TECNOLOGIAS * <span>(seperadas por virgula)</span></label>
            <input 
                type="text" 
                id="tachs"
                value={techs}
                onChange={event => setTechs(event.target.value)}
                placeholder="Quais tecnologiam usam?"
                required
                />
            
            <label htmlFor="price">VALOR DA DIÁRIA * <span>(em branco para gratuito)</span></label>
            <input 
                type="money" 
                id="price"
                value={price}
                onChange={event => setPrice(event.target.value)}
                placeholder="Quanto custa a diária??"
                />

                <button type="submit" className="formBtn do">Cadastrar</button>
            
            {/* <label htmlFor="techs">TECNOLOGIAS * <span>(seperadas por virgula)</span></label>
            <input 
                type="text" 
                id="tachs"
                value={techs}
                onChange={event => setTechs(event.target.value)}
                placeholder="Quais tecnologiam usam?"/> */}
        </form>
    )
}