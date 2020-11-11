import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
import Footer from '../../components/Footer';
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
        <img className="" src={logoImg} alt="Gestão Vet" />
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
          <div className="col py-2">
            <h4 className="text-center">
              <Link className="color-link" to="/consulta">
                Consultas
              </Link>
            </h4>
          </div>
          <div className="col">
            <span className="tab">
              <h4 className="text-center">
                <Link className="color-link" to="/consulta/pet">
                  Pet
              </Link>
              </h4>
            </span>
          </div>
        </div>
      </div>
      <div className="py-5">
        <Row>
          {consultas.map((consulta) => (
            <div key={consulta.id}>
                 <Col md={2}>
                  <Card className="shadow-sm" style={{ width: '18rem' }}>
                    <Card.Header>
                      <Row>
                        <Col>
                          <h5>Informações do pet: </h5>
                        </Col>
                        <Col md={2}>
                          <button
                            className="noBackground"
                            onClick={() => handleDeleteConsultaPet(consulta.id)}
                            type="button"
                          >
                            <FiTrash2 size={20} color="#C0C0C0" />
                          </button>
                        </Col>
                      </Row>
                    </Card.Header>
                    <ListGroup variant="flush">
                      <ListGroup.Item><strong>Nome do pet:</strong> {consulta.nome}</ListGroup.Item>
                      <ListGroup.Item><strong>Sexo: </strong>{consulta.sexo}</ListGroup.Item>
                      <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                    </ListGroup>
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
