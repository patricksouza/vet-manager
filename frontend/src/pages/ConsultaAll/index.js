import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/adm_index.svg";

export default function ConsultaFuncs() {
  const history = useHistory();

  const [consultas, setConsultas] = useState([]);

  const admNome = localStorage.getItem("admNome");
  const admEmail = localStorage.getItem("admEmail");

  useEffect(() => {
    api.get("/consulta/all").then((response) => {
      setConsultas(response.data);
    });
  }, [admEmail]);

  function handleLogout() {
    localStorage.clear();
    history.push("/admin");
  }
  return (
    <div className="consulta-container">
      <header>
        <img className="" src={logoImg} alt="Gestão Vet" />
        <span>Bem vindo, {admNome}</span>

        <Link className="button-index" to="/funcionario/new">
          Cadastrar novo funcionário
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#5C9E6B" />
        </button>
      </header>
      <br></br>
      <hr></hr>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard">
                Funcionários
              </Link>
            </h4>
          </div>
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/consulta">
                Consultas
              </Link>
              <hr className="hr-link"></hr>
            </h4>
          </div>
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/pet">
                Pets
              </Link>
            </h4>
          </div>
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/clientes">
                Clientes
              </Link>
            </h4>
          </div>
        </div>
      </div>

      <div className="py-5">
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.email}>
              <div className="row">
                <div className="col">
                  <strong>E-mail do cliente:</strong>
                  <p>{consulta.cliente_email}</p>
                </div>
                <div className="col">
                  <strong>Especialidade:</strong>
                  <p>{consulta.especialidade}</p>
                </div>
                <div className="col">
                  <strong>Data:</strong>
                  <p>{consulta.data}</p>
                </div>
              </div>

              <div className="row">
                <div className="col-4">
                  <strong>Hora:</strong>
                  <p>{consulta.hora}</p>
                </div>
                <div className="col">
                  <strong>Pet:</strong>
                  <p>{consulta.pet_id}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
