import "./styles.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/pet_new.svg";

export default function NewPet() {
  const [nome, setNome] = useState("");
  const [raca, setRaca] = useState("");
  const [sexo, setSexo] = useState("");
  const [especie, setEspecie] = useState("");
  const [peso, setPeso] = useState("");
  const [idade, setIdade] = useState("");

  const history = useHistory();

  const clienteEmail = localStorage.getItem("clienteEmail");

  async function handleNewPet(e) {
    e.preventDefault();
    const dados = {
      nome,
      raca,
      sexo,
      especie,
      peso,
      idade,
    };

    try {
      await api.post("/pet", dados, {
        headers: {
          Authorization: clienteEmail,
        },
      });

      history.push("/consulta");
    } catch (err) {
      alert(err);
      //alert('Erro ao cadastrar a consulta, tente novamente')
    }
  }

  return (
    <div className="new-consulta-container">
      <div className="content shadow-sm">
        <section className="container">
          <h1 className="text-center">Cadastre seu pet!</h1>
          <img className="img-logo-pet text-center" src={logoImg} alt="Gestão Vet" />

          <p>Preencha os campos ao lado para marcar uma consulta conosco.</p>

          <Link className="back-link" to="/consulta">
            <FiArrowLeft size={16} color="#00a85a" />
            Voltar para a página de consultas
          </Link>
        </section>

        <form onSubmit={handleNewPet}>
          <input
            placeholder="Nome do seu pet"
            value={nome}
            type="text"
            onChange={(e) => setNome(e.target.value)}
            required="true"
          />
          <input
            placeholder="Raça"
            value={raca}
            onChange={(e) => setRaca(e.target.value)}
            required="true"
          />
          <input
            placeholder="Espécie"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required="true"
          />
          <select
            placeholder=""
            value={sexo}
            onChange={(e) => setSexo(e.target.value)}
            className="select"
            required="true"
          >
            <option value="" disabled selected>
              Selecione um sexo
            </option>
            <option value="Macho">Macho</option>
            <option value="Fêmea">Fêmea</option>
          </select>

          <input
            placeholder="Peso"
            value={peso}
            type="number"
            min="0"
            onChange={(e) => setPeso(e.target.value)}
            required="true"
          />
          <input
            placeholder="Idade"
            value={idade}
            type="number"
            min="0"
            onChange={(e) => setIdade(e.target.value)}
            required="true"
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
