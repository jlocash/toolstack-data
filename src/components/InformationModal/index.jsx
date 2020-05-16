import './styles.css';
import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

const InformationModal = ({ show, onHide, loading, properties  }) => {
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>System Information</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="software">
          <Row>
            <Col md="auto">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="software">Software</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="hardware">Hardware</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="networking">Networking</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Tab.Content>
                <Tab.Pane eventKey="software">
                  <Container fluid>
                    <Row className="information-row">
                      <Col><strong>OpenXT Version</strong></Col>
                      <Col>{loading ? 'Loading' : properties.build_info.version}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>OpenXT Build</strong></Col>
                      <Col>{loading ? 'Loading' : properties.build_info.build}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>OpenXT Tools Verison</strong></Col>
                      <Col>{loading ? 'Loading' : properties.build_info.tools}</Col>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="hardware">
                  <Container fluid>
                    <Row className="information-row">
                      <Col><strong>Vendor</strong></Col>
                      <Col>{loading ? 'Loading' : properties.vendor}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Model</strong></Col>
                      <Col>{loading ? 'Loading' : properties.model}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>BIOS</strong></Col>
                      <Col>{loading ? 'Loading' : properties.bios_revision}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Total Physical Memory</strong></Col>
                      <Col>{loading ? 'Loading' : properties.total_mem}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Free Physical Memory</strong></Col>
                      <Col>{loading ? 'Loading' : properties.free_mem}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Total Disk Space</strong></Col>
                      <Col>{loading ? 'Loading' : properties.total_storage}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Free Disk Space</strong></Col>
                      <Col>{loading ? 'Loading' : properties.free_storage}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Physical CPU Model</strong></Col>
                      <Col>{loading ? 'Loading' : properties.physical_cpu_model}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Physical GPU Model</strong></Col>
                      <Col>{loading ? 'Loading' : properties.physical_gpu_model}</Col>
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="networking">
                  <Container fluid>
                    <Row className="information-row">
                      <Col><strong>Wired MAC Address</strong></Col>
                      <Col>{loading ? 'Loading' : properties.eth0_mac}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Wired Model</strong></Col>
                      <Col>{loading ? 'Loading' : properties.eth0_model}</Col>
                    </Row>
                    <Row className="information-row">
                      <Col><strong>Wireless Model</strong></Col>
                      <Col>{loading ? 'Loading' : properties.wireless_model}</Col>
                    </Row>
                  </Container>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default InformationModal;
