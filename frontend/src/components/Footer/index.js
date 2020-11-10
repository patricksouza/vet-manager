import React, { Component } from "react";
import { Row, Col } from "react-bootstrap";
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

//Style
import "./styles.css";

class Footer extends Component {
  render() {
    return (
      <div className="footer">
        <div className="container">
          <Row className="d-flex justify-content-between">
            <Col>
              <p className="">
              Codev © 2020. Todos os Direitos Reservados
              </p>
            </Col>
          <Col className="ml-2" xs={14}>
              <a href="#facebook"  style={{ color: '#4267B2' }}> <FaFacebook /></a>
            </Col>
          <Col className="ml-2" xs={14}>
              <a href="https://instagram.com/festejaap?igshid=1qlsw3ogb5is5" target="_blank"  rel="noopener noreferrer" style={{ color: '#E1306C' }}> <FaInstagram /></a>
            </Col>
          <Col className="ml-2" xs={14}>
              <a href="#twitter" style={{ color: '#1DA1F2' }}><FaTwitter /></a>
            </Col>
          </Row>

        </div>
      </div>
    );
  }
}

export default Footer;
