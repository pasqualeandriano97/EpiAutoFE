import {
  Container,
  Image,
  Nav,
  Navbar,
  Button,
  Modal,
  Form,
  Dropdown,
} from "react-bootstrap";
import { register, login } from "../../Data/Auth";
import { userDetails } from "../../Data/User";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { saveToken } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { RESET_VEHICLES } from "../../redux/actions/vehicleActions";

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
  const [showLogout, setShowLogout] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClose1 = () => setShow1(false);
  const handleShowLogout = () => setShowLogout(true);
  const handleCloseLogout = () => setShowLogout(false);
  const [formdataR, setFormdataR] = useState(initialStateR);
  const [formdataL, setFormdataL] = useState(initialStateL);
  const [formdataU, setFormdataU] = useState(initialStateU);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    register(formdataR);
    setShow1(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    login(formdataL).then((data) => {
      window.localStorage.setItem("token", data.token);
      dispatch(saveToken(data.token));
      setToken(data.token);
      handleUser(data.token);
      navigate("/vehicle");
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
  const logout = () => {
    window.localStorage.removeItem("token");
    setToken("");
    dispatch(saveToken(""));
    dispatch({ type: RESET_VEHICLES });
    dispatch({ type: "RESET_REDUX_RENT" });
    dispatch({ type: "RESET_REDUX_APPOINTMENT" });
    handleCloseLogout();
    navigate("/");
  };
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary py-0 fixed-top">
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
              <Link to="/" className="nav-link">
                Home
              </Link>
              {token && (
                <Link to="/vehicle" className="nav-link">
                  Parco Auto
                </Link>
              )}
              {token && (
                <Link to="/myrent" className="nav-link">
                  Tuoi noleggi
                </Link>
              )}
              {token && (
                <Link to="/myappointments" className="nav-link">
                  Tuoi Appuntamenti
                </Link>
              )}
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
                  <Dropdown className="mb-3 mb-lg-0 ">
                    <Dropdown.Toggle
                      className="text-dark bg-body-secondary border-secondary"
                      id="dropdown-basic"
                    >
                      Ciao! {formdataU.name} {formdataU.surname}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item className="my-2">
                        <Link
                          to="/user"
                          className="text-dark text-decoration-none"
                        >
                          Dettagli Account
                        </Link>
                      </Dropdown.Item>

                      <Dropdown.Item>
                        <Button
                          className="mb-1 ms-auto"
                          variant="primary"
                          onClick={handleShowLogout}
                        >
                          Logout
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
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
      <Modal show={showLogout} onHide={handleCloseLogout}>
        <Modal.Header closeButton>
          <Modal.Title>A presto!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sei sicuro di voler uscire?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseLogout}>
            Annulla
          </Button>
          <Button variant="primary" onClick={logout}>
            Esci
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NavbarComponent;
