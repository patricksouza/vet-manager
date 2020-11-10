import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; // import comunicação com backend

import './styles.css';
import logoImg from '../../assets/form.svg';

export default function Register() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      email,senha,nome,sobrenome,telefone,cidade,estado  
    };

    try {
      const response = await api.post('cliente', data)
      
      alert(`Seu Email de acesso: ${response.data.email}`)

      history.push('/');
    } catch (err) {
      alert(`Erro no cadastro, tente novamente.`)
    }
  }

  return (
    <div className="container register-container">
      <div className="content">
        <section>
          <h1 className="center">Cadastra-se</h1>
          
          <img className="img-logo-form" src={logoImg} alt="Gestão Vet" />
          <p>Faça seu cadastro, entre na plataforma e agende a sua consulta.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#5C9E6B" />
            Voltar para a página inicial
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input 
            type="email" 
            placeholder="Email" 
            value={email}
            onChange={e => setEmail(e.target.value)}  
            required="true"        
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={e => setSenha(e.target.value)}
            required="true"
          />
          <input 
            placeholder="Nome" 
            value={nome}
            onChange={e => setNome(e.target.value)}
            required="true"
          />
          <input 
            placeholder="Sobrenome" 
            value={sobrenome}
            onChange={e => setSobrenome(e.target.value)}
            required="true"
          />
          <input 
            placeholder="Telefone" 
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            required="true"
          />

          <div className="input-group">
            <input 
              placeholder="Cidade" 
              value={cidade}
              style={{ width: 360 }} 
             onChange={e => setCidade(e.target.value)}
             required="true"
            />
            <input 
              placeholder="UF" 
              style={{ width: 80 }} 
              value={estado}
              onChange={e => setEstado(e.target.value)}
              required="true"
            />
          </div>

          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}