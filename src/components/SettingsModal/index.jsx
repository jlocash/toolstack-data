import './styles.css';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import hostActions from '../../dbus/interfaces/xenmgr_host/actions';
import inputActions from '../../dbus/interfaces/input_daemon/actions';
import uiActions from '../../dbus/interfaces/xenmgr_ui/actions';

const mapSoundCardControls = (controls, dispatch) => controls.map((control, index) => {
  switch (control.type) {
    case 'SW': {
      const { value } = control;
      return (
        <Row className="padding-vertical-10 align-items-center" key={index}>
          <Col>{control.name}</Col>
          <Col>
            <Form.Control
              as="select"
              custom
              defaultValue={value}
            // onChange={e => dispatch(inputActions.touchpadSet('tap-to-click-enable', e.target.value))}
            >
              <option value="on">Enabled</option>
              <option value="off">Disabled</option>
            </Form.Control>
          </Col>
        </Row>
      );
    }
    // Enabled/Disabled
    case 'EN': {
      const value = control.value.split(' ')[0].replace('current:', '').replace(/'/g, '');
      return (
        <Row className="padding-vertical-10 align-items-center" key={index}>
          <Col>{control.name}</Col>
          <Col>
            <Form.Control
              as="select"
              custom
              defaultValue={value}
              // onChange={e => dispatch(inputActions.touchpadSet('tap-to-click-enable', e.target.value))}
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </Form.Control>
          </Col>
        </Row>
      );
    }
    // toggle-able slider
    case 'VS': {
      const [value, enabled] = control.value.split('% '); 
      return (
        <>
          <Row className="padding-vertical-10 align-items-center" key={index}>
            <Col>{`${control.name} (%)`}</Col>
            <Col>
              <Form.Control
                as="select"
                custom
                defaultValue={value}
              // onChange={e => dispatch(inputActions.touchpadSet('tap-to-click-enable', e.target.value))}
              >
                <option value="on">Enabled</option>
                <option value="off">Disabled</option>
              </Form.Control>
            </Col>
          </Row>
          <Row>
            <Col />
            <Col>
              <Form.Control
                type="range"
                custom
                min={0}
                max={100}
                defaultValue={value}
                disabled={enabled !== 'on'}
              // onMouseUp={e => dispatch(inputActions.setMouseSpeed(e.target.value))}
              />
            </Col>
          </Row>
        </>
      );
    }
    // slider
    case 'VO': {
      const [value] = control.value.replace('%', '');
      return (
        <Row className="padding-vertical-10 align-items-center" key={index}>
          <Col>{`${control.name} (%)`}</Col>
          <Col>
            <Form.Control
              type="range"
              custom
              min={0}
              max={100}
              defaultValue={value}
              // onMouseUp={e => dispatch(inputActions.setMouseSpeed(e.target.value))}
            />
          </Col>
        </Row>
      );
    }
  }
});

const SettingsModal = props => {
  const {
    show,
    onHide,
    host,
    input,
    ui,
    initialized,
    dispatch,
  } = props;

  const [selectedSoundCard, setSelectedSoundCard] = useState(0);

  if (!initialized) {
    return (
      <Modal show={show} onHide={onHide} centered size="lg" scrollable>
        <Modal.Header closeButton>
          <Modal.Title>Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Loading</div>
        </Modal.Body>
      </Modal>
    );
  }

  return (
    <Modal show={show} onHide={onHide} centered size="lg" scrollable>
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
              <Tab.Content>
                <Tab.Pane eventKey="wallpaper">
                  <Container fluid>
                    <Row lg={2} md={1} xs={1}>
                      {
                        host.available_wallpapers.map((src, index) => (
                          <Col key={index}>
                            <Image
                              rounded
                              src={src}
                              className={`cursor-pointer ${src === ui.properties.wallpaper ? 'settings-wp-selected' : 'settings-wp'}`}
                              onClick={() => dispatch(uiActions.setProperty('wallpaper', src))}
                            />
                          </Col>
                        ))
                      }
                    </Row>
                  </Container>
                </Tab.Pane>
                <Tab.Pane eventKey="input">
                  <Tabs defaultActiveKey="input-general">
                    <Tab eventKey="input-general" title="General">
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Keyboard Layout</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={input.keyboard_layout}
                            onChange={e => dispatch(inputActions.setCurrentKbLayout(e.target.value))}
                          >
                            {
                              input.keyboard_layouts.map((kb, index) => (
                                <option value={kb} key={index}>{kb.toUpperCase()}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Mouse Speed</Col>
                        <Col>
                          <Form.Control
                            type="range"
                            custom
                            min={0}
                            max={10}
                            defaultValue={input.mouse_speed}
                            onMouseUp={e => dispatch(inputActions.setMouseSpeed(e.target.value))}
                          />
                        </Col>
                      </Row>
                    </Tab>
                    <Tab eventKey="input-laptop" title="Laptop" disabled={!host.properties.laptop}>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Touchpad Tap to Click</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={input.touchpad.tap_to_click}
                            onChange={e => dispatch(inputActions.touchpadSet('tap-to-click-enable', e.target.value))}
                          >
                            <option value={true}>Enabled</option>
                            <option value={false}>Disabled</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Touchpad Scrolling</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={input.touchpad.scrolling}
                            onChange={e => dispatch(inputActions.touchpadSet('scrolling-enable', e.target.value))}
                          >
                            <option value={true}>Enabled</option>
                            <option value={false}>Disabled</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Touchpad Speed</Col>
                        <Col>
                          <Form.Control
                            type="range"
                            custom
                            min={0}
                            max={10}
                            defaultValue={input.touchpad.speed}
                            onMouseUp={e => dispatch(inputActions.touchpadSet('speed', e.target.value))}
                          />
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="display">
                  <div>display</div>
                </Tab.Pane>
                <Tab.Pane eventKey="audio">
                  <Tabs defaultActiveKey="audio-devices">
                    <Tab eventKey="audio-devices" title="Devices">
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Playback Device</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={host.properties.playback_pcm}
                            onChange={e => dispatch(hostActions.setProperty('capture-pcm', e.target.value))}
                          >
                            {
                              host.playback_devices.map((dev, index) => (
                                <option key={index} value={dev.id}>{dev.name}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Capture Device</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={host.properties.playback_pcm}
                            onChange={e => dispatch(hostActions.setProperty('playback-pcm', e.target.value))}
                          >
                            {
                              host.capture_devices.map((dev, index) => (
                                <option key={index} value={dev.id}>{dev.name}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                    </Tab>
                    <Tab eventKey="audio-controls" title="Controls" disabled={Object.keys(host.sound_cards).length === 0}>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Sound Card</Col>
                        <Col>
                          <Form.Control
                            as="select"
                            custom
                            defaultValue={selectedSoundCard}
                            onChange={e => setSelectedSoundCard(e.target.value)}
                          >
                            {
                              Object.keys(host.sound_cards).map((id, index) => (
                                <option key={index} value={id}>{host.sound_cards[id].name}</option>
                              ))
                            }
                          </Form.Control>
                        </Col>
                      </Row>
                      <hr />
                      {Object.keys(host.sound_card_controls).length && mapSoundCardControls(host.sound_card_controls[selectedSoundCard], dispatch)}
                    </Tab>
                  </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="sleep">
                  <Tabs defaultActiveKey="sleep-general">
                    <Tab eventKey="sleep-general" title="General">
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Sleep After Inactivity</Col>
                        <Col>
                          <Form.Control as="select" custom>
                            <option value={true}>Enabled</option>
                            <option value={false}>Disabled</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>Sleep After (minutes)</Col>
                        <Col>
                          <Form.Control type="number" min="1" max="" defaultValue={ui.properties.idle_time_threshold}/>
                        </Col>
                      </Row>
                    </Tab>
                    <Tab eventKey="sleep-lid" title="Lid">
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>On AC Power</Col>
                        <Col>
                          <Form.Control as="select" custom defaultValue={host.ac_lid_close_action}>
                            <option value="sleep">Sleep</option>
                            <option value="nothing">Do Nothing</option>
                          </Form.Control>
                        </Col>
                      </Row>
                      <Row className="padding-vertical-10 align-items-center">
                        <Col>On Battery Power</Col>
                        <Col>
                          <Form.Control as="select" custom defaultValue={host.battery_lid_close_action}>
                            <option value="sleep">Sleep</option>
                            <option value="nothing">Do Nothing</option>
                          </Form.Control>
                        </Col>
                      </Row>
                    </Tab>
                  </Tabs>
                </Tab.Pane>
                <Tab.Pane eventKey="updates">
                  <Row className="padding-vertical-10 align-items-center">
                    <Col>Update URL</Col>
                    <Col>
                      <InputGroup>
                        <InputGroup.Prepend>
                          <InputGroup.Text>https://</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control/>
                      </InputGroup>
                    </Col>
                  </Row>
                </Tab.Pane>
                <Tab.Pane eventKey="advanced">
                  <div>advanced</div>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Modal.Body>
    </Modal>
  );
};

export default SettingsModal;
