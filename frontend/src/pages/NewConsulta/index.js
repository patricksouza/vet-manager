import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'; // import comunicação com backend

import './styles.css';

import logoImg from '../../assets/welcome.svg';

export default function NewConsulta() {
  const [especialidade, setEspecialidade]  = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [pet_id, setPet_id] = useState('');

  const history = useHistory();

  const clienteEmail = localStorage.getItem('clienteEmail');

  async function handleNewConsulta(e) {
    e.preventDefault();

    const dados = {
      especialidade, data, hora, pet_id,
    };

    try {
      await api.post('consulta', dados, {
        headers: {
          Authorization: clienteEmail,
        }
      })

      history.push('/consulta');
    } catch (err) {
      alert('Erro ao cadastrar a consulta, tente novamente')
    }
  }

  return (
    <div className="new-consulta-container">
      <div className="content shadow">
        <section className="container">
          <h1>Cadastre sua nova consulta!</h1>
          <img className="img-logo-new left" src={logoImg} alt="Gestão Vet"/>
          <p>Preencha os campos ao lado para marcar uma consulta conosco.</p>

          <Link className="back-link" to="/consulta">
            <FiArrowLeft size={16} color="#00a85a" />
            Voltar para a página de consultas
          </Link>
        </section>

        <form onSubmit={handleNewConsulta}>
        <input
            placeholder="Nome do Pet"
            value={pet_id}
            onChange={e => setPet_id(e.target.value)}
            required="true"
          />
          <select 
          placeholder="Especialidade"
          value={especialidade}
          onChange={e=>setEspecialidade(e.target.value)}
          required="true"
          className="select"
          >
              <option value="" disabled selected>Selecione uma especialidade</option>
              <option value="Cardiologista">Cardiologista</option>
              <option value="Clínico Geral">Clínico Geral</option>
              <option value="Ortopedista">Ortopedista</option>
          </select>
          <input
            placeholder="Data"
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            required="true"
          />

          <input
            placeholder="Hora"
            type="time"
            value={hora}
            onChange={e => setHora(e.target.value)}
            required="true"
          />
         

          <button className="button down" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}