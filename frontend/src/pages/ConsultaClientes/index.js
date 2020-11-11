import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/adm_index.svg";

import {Row,Col} from "react-bootstrap";

export default function ConsultaPet() {
  const history = useHistory();

  const [consultas, setConsultas] = useState([]);

  const admNome = localStorage.getItem("admNome");
  const admEmail = localStorage.getItem("admEmail");

  useEffect(() => {
    api
      .get("cliente")
      .then((response) => {
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
        <img className="logo-func" src={logoImg} alt="Gestão Vet"/>
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
        <Row>
          <Col>
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard">
                Funcionários
              </Link>
            </h4>
          </Col>
          <Col>
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/consulta">
                Consultas
              </Link>
            </h4>
          </Col>
          <Col>
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/pet">
                Pets
              </Link>
             
            </h4>
          </Col>
         
          <Col>
          <span className="tab shadow-sm">
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/clientes">
                Clientes
              </Link>
            </h4>
            </span>
          </Col>
        </Row>
      </div>
      <div className="py-5">
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.email}>
              <Row>
                <Col>
                  <strong>Nome:</strong>
                  <p>{consulta.nome}</p>
                </Col>
                <Col>
                  <strong>Sobrenome:</strong>
                  <p>{consulta.sobrenome}</p>
                </Col>
              </Row>
              <Row>
                
              <Col>
                  <strong>E-mail:</strong>
                  <p>{consulta.email}</p>
                </Col>
                <Col>
                  <strong>Telefone:</strong>
                  <p>{consulta.telefone}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <strong>UF:</strong>
                  <p>{consulta.estado}</p>
                </Col>
                <Col>
                  <strong>Cidade:</strong>
                  <p>{consulta.cidade}</p>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
