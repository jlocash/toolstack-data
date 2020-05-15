import './styles.css';
import React from 'react';
import SystemTray from '../../containers/SystemTray';
import OpenXTLogo from '../../assets/images/logos/header_logo.png';
import { Container, Row, Col } from 'react-bootstrap';

const HeaderBar = ({ time }) => {
  return (
    <Container fluid>
      <Row>
        <Col md="auto">
          <img src={OpenXTLogo} />
        </Col>
        <Col className="text-align-center margin-auto">{time}</Col>
        <Col md="auto">
          <SystemTray />
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderBar;
