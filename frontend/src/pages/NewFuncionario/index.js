import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; // import comunicação com backend

import './styles.css';

import logoImg from '../../assets/new_func.svg';

export default function NewConsulta() {
  const [nome, setNomeFunc]  = useState('');
  const [sobrenome,setSobreNomeFunc] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');
  const [telefone,setTelefone] = useState('');
  const [cidade,setCidade] = useState('');
  const [estado,setEstado] = useState('');
  const [cargo,setCargo] = useState('');
  //const [status,setStatus] = useState('');
  const history = useHistory();
  const status = 'USER';
  const clienteEmail = localStorage.getItem('clienteEmail');

  async function handleNewConsulta(e) {
    e.preventDefault();
    
    const dados = {
      senha,nome,sobrenome,email,telefone,cidade, estado,cargo,status
    };

    try {
      await api.post('funcionario', dados, {
        headers: {
          Authorization: clienteEmail,
        }
      })

      history.push('/dashboard');
    } catch (err) {
      alert('Erro ao cadastrar a consulta, tente novamente')
    }
  }

  return (
    <div className="new-consulta-container">
      <div className="content">
        <section>
          <h1>Cadastre um funcionário!</h1>
          <img className="img-logo-new left" src={logoImg} alt="Gestão Vet"/>
          <p>Preencha os campos ao lado para cadastrar um funcionário.</p>

          <Link className="back-link" to="/dashboard">
            <FiArrowLeft size={16} color="#00a85a" />
            Voltar para a consulta
          </Link>
        </section>

        <form onSubmit={handleNewConsulta}>
        <input
            placeholder="Nome"
            value={nome}
            onChange={e => setNomeFunc(e.target.value)}
            required="true"
          />
          <input
            placeholder="Sobrenome"
            value={sobrenome}
            onChange={e => setSobreNomeFunc(e.target.value)}
            required="true"
          />

          <input
            placeholder="E-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required="true"
          />
          <input
            placeholder="Telefone"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            required="true"
          />
          <input
            placeholder="Cidade"
            value={cidade}
            onChange={e => setCidade(e.target.value)}
            required="true"
          />
          <input
            placeholder="Estado"
            value={estado}
            onChange={e => setEstado(e.target.value)}
            required="true"
          />
          <input
            placeholder="Cargo"
            value={cargo}
            onChange={e => setCargo(e.target.value)}
            required="true"
          />
           <input
            placeholder="Senha"
            value={senha}
            type="password"
            onChange={e => setSenha(e.target.value)}
            required="true"
          />

          <button className="button down" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}