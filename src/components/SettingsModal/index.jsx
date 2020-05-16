import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import WallpaperIcon from '../WallpaperIcon';
import Container from 'react-bootstrap/Container';

const SettingsModal = props => {
  const {
    show,
    onHide,
    host,
    input,
    ui,
  } = props;

  const [selectedWallpaper, setSelectedWallpaper] = useState(ui.properties.wallpaper);
  useEffect(() => {
    setSelectedWallpaper(ui.properties.wallpaper);
  }, [props]);

  return (
    <Modal show={show} onHide={onHide} centered scrollable size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Settings</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tab.Container id="left-tabs-example" defaultActiveKey="wallpaper">
          <Row>
            <Col md="auto">
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="wallpaper">Wallpaper</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="input">Input Devices</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="display">Display</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="audio">Audio</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="sleep">Sleep</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="updates">Software Updates</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="advanced">Advanced</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col>
              <Form>
                <Tab.Content>
                  <Tab.Pane eventKey="wallpaper">
                    <Container>
                      <Row>
                        {
                          host.available_wallpapers.map((src, index) => (
                            <Col key={index} lg={3}>
                              <WallpaperIcon
                                src={src}
                                className="padding-vertical-10 justify-content-center flex"
                                selected={src === selectedWallpaper}
                                onClick={() => setSelectedWallpaper(src)}
                              />
                            </Col>
                          ))
                        }
                      </Row>
                    </Container>
                  </Tab.Pane>
                  <Tab.Pane eventKey="input">
                    <Tabs defaultActiveKey="input-general" id="uncontrolled-tab-example">
                      <Tab eventKey="input-general" title="General">
                        <Form.Row className="padding-vertical-10">
                          <Form.Label column>Keyboard Layout</Form.Label>
                          <Col>
                            <Form.Control as="select">
                              {
                                input.keyboard_layouts.map((kb, index) => (
                                  <option value={kb} key={index} selected={kb === input.keyboard_layout}>{kb.toUpperCase()}</option>
                                ))
                              }
                            </Form.Control>
                          </Col>
                        </Form.Row>
                        <Form.Row className="padding-vertical-10">
                          <Form.Label column>Mouse Speed</Form.Label>
                          <Col>
                            <Form.Control type="range" min={0} max={10} defaultValue={input.mouse_speed} custom/>
                          </Col>
                        </Form.Row>
                      </Tab>
                      <Tab eventKey="input-laptop" title="Laptop">
                        <Form.Group>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>Touchpad Tap to Click</Form.Label>
                            <Col>
                              <Form.Control as="select">
                                <option value={true} selected={input.touchpad.tap_to_click}>Enabled</option>
                                <option value={false} selected={!input.touchpad.tap_to_click}>Disabled</option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>Touchpad Scrolling</Form.Label>
                            <Col>
                              <Form.Control as="select">
                                <option value={true} selected={input.touchpad.scrolling}>Enabled</option>
                                <option value={false} selected={!input.touchpad.scrolling}>Disabled</option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>Touchpad Speed</Form.Label>
                            <Col>
                              <Form.Control type="range" min={0} max={10} custom defaultValue={input.touchpad.speed}/>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                      </Tab>
                    </Tabs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="display">
                    <div>display</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="audio">
                    <div>audio</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sleep">
                    <Tabs defaultActiveKey="sleep-general">
                      <Tab eventKey="sleep-general" title="General">
                        <Form.Group>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>Sleep After Inactivity</Form.Label>
                            <Col>
                              <Form.Control as="select">
                                <option value={true}>Enabled</option>
                                <option value={false}>Disabled</option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>Sleep After (minutes)</Form.Label>
                            <Col>
                              <Form.Control type="number" min="1" max="" defaultValue={ui.properties.idle_time_threshold}/>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                      </Tab>
                      <Tab eventKey="sleep-lid" title="Lid">
                        <Form.Group>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>On AC Power</Form.Label>
                            <Col>
                              <Form.Control as="select">
                                <option
                                  value={true}
                                  selected={host.ac_lid_close_action === 'sleep'}>
                                    Sleep
                                </option>
                                <option
                                  value={false}
                                  selected={host.ac_lid_close_action === 'nothing'}>
                                    Do Nothing
                                </option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                          <Form.Row className="padding-vertical-10">
                            <Form.Label column>On Battery Power</Form.Label>
                            <Col>
                              <Form.Control as="select">
                                <option value={true} selected={host.battery_lid_close_action === 'sleep'}>Sleep</option>
                                <option value={false} selected={host.battery_lid_close_action === 'nothing'}>Do Nothing</option>
                              </Form.Control>
                            </Col>
                          </Form.Row>
                        </Form.Group>
                      </Tab>
                    </Tabs>
                  </Tab.Pane>
                  <Tab.Pane eventKey="updates">
                    <div>updates</div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="advanced">
                    <div>advanced</div>
                  </Tab.Pane>
                </Tab.Content>
              </Form>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>Cancel</Button>
        <Button variant="primary">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SettingsModal;
