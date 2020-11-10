import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/adm_index.svg";

export default function ConsultaFuncs() {
  const history = useHistory();

  const [funcionarios, setFuncionarios] = useState([]);

  const admNome = localStorage.getItem("admNome");
  const admEmail = localStorage.getItem("admEmail");

  useEffect(() => {
    api
      .get("funcionario", {
        headers: {
          Authorization: admEmail,
        },
      })
      .then((response) => {
        setFuncionarios(response.data);
      });
  }, [admEmail]);

  function handleLogout() {
    localStorage.clear();
    history.push("/admin");
  }

  return (
    <div className="consulta-container">
      <header>
        <img className="logo-func" src={logoImg} alt="Gestão Vet" />
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
            <div className="tab-option">
              <h4 className="text-center">
                <Link className="color-link" to="/consulta">
                  Funcionários
                </Link>
              </h4>
            </div>
          </div>
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/consulta">
                Consultas
              </Link>
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
          {funcionarios.map((funcionarios) => (
            <li key={funcionarios.email}>
              <div className="row">
                <div className="col">
                  <strong>Nome:</strong>
                  <p>{funcionarios.nome}</p>
                </div>
                <div className="col">
                  <strong>Sobrenome:</strong>
                  <p>{funcionarios.sobrenome}</p>
                </div>
                ,
                <div className="col">
                  <strong>E-mail:</strong>
                  <p>{funcionarios.email}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <strong>Telefone:</strong>
                  <p>{funcionarios.telefone}</p>
                </div>
                <div className="col-2">
                  <strong>Cargo:</strong>
                  <p>{funcionarios.cargo}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <strong>Cidade:</strong>
                  <p>{funcionarios.cidade}</p>
                </div>
                <div className="col-4">
                  <strong>Estado:</strong>
                  <p>{funcionarios.estado}</p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
