import './styles.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import hostActions from '../../dbus/interfaces/xenmgr_host/actions';
import { FiRefreshCw, FiPauseCircle, FiPower } from 'react-icons/fi';
import { IconContext } from 'react-icons';

const PowerModal = ({ show, onHide, dispatch }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Power</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <IconContext.Provider value={{ color: 'black', size: '30px' }}>
          <Container>
            <Row>
              <Col>
                <Row className="justify-content-center power-modal-icon">
                  <FiPauseCircle className="cursor-pointer" onClick={() => dispatch(hostActions.sleep())}/>
                </Row>
                <Row className="justify-content-center">Sleep</Row>
              </Col>
              <Col>
                <Row className="justify-content-center power-modal-icon">
                  <FiRefreshCw className="cursor-pointer" onClick={() => dispatch(hostActions.reboot())}/>
                </Row>
                <Row className="justify-content-center">Restart</Row>
              </Col>
              <Col>
                <Row className="justify-content-center power-modal-icon">
                  <FiPower className="cursor-pointer" onClick={() => dispatch(hostActions.shutdown())}/>
                </Row>
                <Row className="justify-content-center">Shutdown</Row>
              </Col>
            </Row>
          </Container>
        </IconContext.Provider>
      </Modal.Body>
    </Modal>
  );
};

export default PowerModal;
