import {
  Container,
  Image,
  Nav,
  Navbar,
  Button,
  Modal,
  Form,
} from "react-bootstrap";
import { register, login } from "../../Data/Auth";
import { userDetails } from "../../Data/User";
import { useEffect, useState } from "react";

function NavbarComponent() {
  const initialStateR = {
    name: "",
    surname: "",
    email: "",
    password: "",
  };
  const initialStateL = {
    email: "",
    password: "",
  };
  const initialStateU = {
    name: "",
    surname: "",
  };
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const [formdataR, setFormdataR] = useState(initialStateR);
  const [formdataL, setFormdataL] = useState(initialStateL);
  const [formdataU, setFormdataU] = useState(initialStateU);
  const handleRegister = (e) => {
    e.preventDefault();
    register(formdataR);
    setShow1(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login(formdataL).then((data) => {
      window.localStorage.setItem("token", data.token);
      setToken(data.token);
      handleUser(data.token);
    });
    setShow(false);
  };
  const handleUser = (token) => {
    userDetails(token).then((data) => {
      setFormdataU({ ...formdataU, name: data.name, surname: data.surname });
    });
  };
  const translateModal = () => {
    setShow(false);
    setShow1(true);
  };
  useEffect(() => {
    setToken(window.localStorage.getItem("token"));
    if (token) {
      handleUser(token);
    }
  }, []);
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary py-0">
        <Container fluid className="px-4">
          <Navbar.Brand href="#home">
            <Image
              src={"NavBarLogo.png"}
              height={60}
              width={180}
              alt={"Logo"}
            ></Image>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            {!token ? (
              <Nav>
                <Nav.Item href="#link">
                  <Button variant="primary" onClick={handleShow}>
                    Login
                  </Button>
                </Nav.Item>
              </Nav>
            ) : (
              <Nav>
                <Nav.Item className="pe-3">
                  <p>
                    Ciao! {formdataU.name} {formdataU.surname}
                  </p>
                </Nav.Item>
              </Nav>
            )}
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci i tuoi dati per accedere</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci l'email"
              onChange={(e) =>
                setFormdataL({ ...formdataL, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci la password"
              onChange={(e) =>
                setFormdataL({ ...formdataL, password: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-primary bg-white border-0 text-black"
            onClick={translateModal}
          >
            Se non sei ancora registrato clicca qui
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
          <Button variant="Secondary" onClick={handleClose}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={show1} onHide={handleClose1}>
        <Modal.Header closeButton>
          <Modal.Title>Inserisci i tuoi dati per registrarti</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il nome"
              onChange={(e) =>
                setFormdataR({ ...formdataR, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicSurname">
            <Form.Label>Cognome</Form.Label>
            <Form.Control
              type="text"
              placeholder="Inserisci il cognome"
              onChange={(e) =>
                setFormdataR({ ...formdataR, surname: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasic1Email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Inserisci l'email"
              onChange={(e) =>
                setFormdataR({ ...formdataR, email: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasic1Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Inserisci la password"
              onChange={(e) =>
                setFormdataR({ ...formdataR, password: e.target.value })
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleRegister}>
            Registrati
          </Button>
          <Button variant="Secondary" onClick={handleClose1}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarComponent;
