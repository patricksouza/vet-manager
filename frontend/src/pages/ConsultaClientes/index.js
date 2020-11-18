import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower } from "react-icons/fi";

import api from "../../services/api"; // import comunicação com backend

import "./styles.css";

import logoImg from "../../assets/adm_index.svg";

import { Row, Col,Card } from "react-bootstrap";
import Footer from '../../components/Footer';


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
      <div className="container py-5">
        <Row className="d-flex justify-content-center">
          {consultas.map((consulta) => (
            <div className="" key={consulta.email}>
              <Col className="mb-4" md={1}>
                <Card className="shadow-sm" style={{ width: '18rem' }}>
                  <Card.Header className="bg-light">
                    <Row>
                      <Col className="py-1">
                        <p>Informações da consulta: </p>
                      </Col>
                    </Row>

                  </Card.Header>
                  <Card.Body>

                    <Card.Text>
                      <p><strong>E-mail: </strong> {consulta.email}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>Nome: </strong>{consulta.nome}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>Sobrenome: </strong>{consulta.sobrenome}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>E-mail: </strong>{consulta.email}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>telefone: </strong>{consulta.telefone}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>Estado: </strong>{consulta.estado}</p>
                    </Card.Text>
                    <Card.Text>
                      <p><strong>Cidade: </strong>{consulta.cidade}</p>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </div>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
}
