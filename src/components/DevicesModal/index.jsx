import React from 'react';
import Modal from 'react-bootstrap/Modal';

const DevicesModal = ({ show, onHide, cdDevices, usbDevices, initialized }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Devices</Modal.Title>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>
  );
};

export default DevicesModal;
