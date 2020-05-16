import './styles.css';
import React from 'react';
// import Image from 'react-bootstrap/Image';
import SystemTray from '../../containers/SystemTray';
// import OpenXTLogo from '../../assets/images/logos/header_logo.png';
import { Container, Row, Col } from 'react-bootstrap';

const HeaderBar = ({ time }) => {
  return (
    <Container fluid>
      <Row>
        <Col>
          {/* <Image src={OpenXTLogo} /> */}
        </Col>
        <Col className="text-align-center text-white margin-auto">{time}</Col>
        <Col>
          <SystemTray />
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderBar;
