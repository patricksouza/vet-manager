import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Row, Col } from "react-bootstrap";
import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/profile.svg";

export default function ConsultaPet() {
  const history = useHistory();

  const [consultas, setConsultas] = useState([]);

  const clienteNome = localStorage.getItem("clienteNome");
  const clienteEmail = localStorage.getItem("clienteEmail");

  useEffect(() => {
    api
      .get("pet", {
        headers: {
          Authorization: clienteEmail,
        },
      })
      .then((response) => {
        setConsultas(response.data);
      });
  }, [clienteEmail]);

  async function handleDeleteConsultaPet(id) {
    try {
      await api.delete(`pet/${id}`, {
        headers: {
          Authorization: clienteEmail,
        },
      });

      setConsultas(consultas.filter((consulta) => consulta.id !== id));
    } catch (err) {
      alert("Erro ao deletar a consulta, tente novamente.");
    }
  }

  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }

  return (
    <div className="consulta-container">
      <header>
        <img className="" src={logoImg} alt="Gestão Vet" />f 
        <span>Bem vindo, {clienteNome}</span>

        <Link className="button-index btn-left" to="/pet/new">
          Cadastrar pet
        </Link>
        <Link className="button-index" to="/consulta/new">
          Cadastrar nova consulta
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#5C9E6B" />
        </button>
      </header>
      <hr></hr>
      <div className="container py-5">
        <div className="row">
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/consulta">
                Consultas
              </Link>
            </h4>
          </div>
          <div className="col">
            <h4 className="text-center">
              <Link className="color-link" to="/consulta/pet">
                Pet
              </Link>
              <hr className="hr-link"></hr>
            </h4>
          </div>
        </div>
      </div>
      <div className="py-5">
        <ul>
          {consultas.map((consulta) => (
            <li key={consulta.email}>
              <Row>
                <Col>
                  <strong>Nome do pet:</strong>
                  <p>{consulta.nome}</p>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <strong>Peso:</strong>
                  <p>{consulta.peso} Kg</p>
                </Col>
                <Col>
                  <strong>Idade:</strong>
                  <p>{consulta.idade} Anos</p>
                </Col>
              </Row>

              <Row>
                <Col>
                  <strong>Sexo:</strong>
                  <p>{consulta.sexo}</p>
                </Col>
                <Col>
                  <strong>Raça:</strong>
                  <p>{consulta.raca}</p>
                </Col>
                <Col>
                  <strong>Espécie:</strong>
                  <p>{consulta.especie}</p>
                </Col>
              </Row>
              <button
                className="noBackground"
                onClick={() => handleDeleteConsultaPet(consulta.id)}
                type="button"
              >
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
