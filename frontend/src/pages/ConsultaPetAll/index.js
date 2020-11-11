import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/adm_index.svg";

import { Card,ListGroup, Row, Col } from "react-bootstrap";

export default function ConsultaPet() {
  const history = useHistory();

  const [consultas, setConsultas] = useState([]);

  const admNome = localStorage.getItem("admNome");
  const admEmail = localStorage.getItem("admEmail");

  useEffect(() => {
    api
      .get("pet/all")
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
            <span className="tab shadow-sm">
              <h4 className="text-center">
                <Link className="color-link" to="/dashboard/pet">
                  Pets
              </Link>
              </h4>
            </span>
          </Col>

          <Col>
            <h4 className="text-center">
              <Link className="color-link" to="/dashboard/clientes">
                Clientes
              </Link>
            </h4>
          </Col>
        </Row>
      </div>
      <div className="py-5">
        <Row>
          {consultas.map((consulta) => (
            <div key={consulta.id}>
              <Col md={2}>
                <Card className="shadow-sm" style={{ width: '25rem' }}>
                    <Card.Header>
                       <h5> Informações do pet: </h5>
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item><strong>Nome do pet: </strong> {consulta.nome}</ListGroup.Item>
                        <ListGroup.Item><strong>Peso: </strong> {consulta.peso}</ListGroup.Item>
                        <ListGroup.Item><strong>Idade: </strong> {consulta.idade}</ListGroup.Item>
                        <ListGroup.Item><strong>Sexo: </strong>{consulta.sexo}</ListGroup.Item>
                        <ListGroup.Item><strong>Raça: </strong>{consulta.raca}</ListGroup.Item>
                        <ListGroup.Item><strong>Espécie: </strong> {consulta.especie}</ListGroup.Item>
                    </ListGroup>
                </Card>
              </Col>
            </div>
          ))}
        </Row>
      </div>
    </div>
  );
}
