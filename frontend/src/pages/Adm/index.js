import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api'; // import comunicação com backend

import './styles.css'
import heroesImg from '../../assets/adm.svg';
import Footer from '../../components/Footer';
//import logoImg from '../../assets/logo01.png';


export default function Logon() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault();

    try {


      const response = await api.post('session_funcionario', { email, senha });

      localStorage.setItem('admEmail', email);
      localStorage.setItem('admNome', response.data.nome);

      history.push('/dashboard');
    } catch (err) {
      alert('Falha no login, tente novamente.');
    }
  }

  return (
    <>
      <div className="logon-container">
        <section className="form">
          {/* <img className="img-logo left" src={logoImg} alt="Gestão Vet" /> */}
          <form onSubmit={handleLogin}>
            <h4>Faça seu login, Administrador!</h4>

            <div className="py-2">
              <input
                placeholder="Seu email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required="true"
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={e => setSenha(e.target.value)}
                required="true"
              />
            </div>
            <button className="button" type="submit">Entrar</button>
          </form>
        </section>

        <img className="img-main" src={heroesImg} alt="Heroes" />
      </div>
      <Footer />
    </>

  );
};