import React, { useState } from 'react';
import api from '../../services/api'


export default function Login({ history }) {
     //estado = qualquer informacao que o elemento guarda
    const [email, setEmail] = useState('');

    async function handleSubmit(event){
        event.preventDefault();

        //email

        const res = await api.post('/sessions', {email});

        const { _id } = res.data;

        localStorage.setItem('user', _id);

        history.push('/dashboard')
    }

    //<> fragment tag, parece div mas n aparece/afeta html
    return (
        <>
            <p>
            Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para seu time
            </p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input 
                type="text"
                className="email"
                placeholder="Seu melhor e-mail"
                value={email}
                onChange={event => setEmail(event.target.value)}
                />

                <button className="formBtn do" type="submit" id="enviar">Entrar</button>
            </form>
        </>
    )
}