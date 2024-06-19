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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveToken, saveUser } from "../../redux/actions/userActions";
import { Link, useNavigate } from "react-router-dom";
import { RESET_VEHICLES } from "../../redux/actions/vehicleActions";
import { DELETE_USER } from "../../redux/actions/userActions";
import { requestResetPassword } from "../../Data/resetPassword";

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

  const token = window.localStorage.getItem("token");
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
  const user = useSelector((state) => state.user.user);
  const showNavbar = useSelector((state) => state.navbar.show);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    register(formdataR);
    setShow1(false);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    if (formdataL.email !== "") {
      login(formdataL).then((data) => {
        window.localStorage.setItem("token", data.token);
        dispatch(saveToken(data.token));
        // setToken(data.token);
        handleUser(data.token);
        navigate("/vehicle");
      });
      setShow(false);
    } else {
      alert("Inserisci l'email!");
    }
  };
  const handleUser = (token) => {
    dispatch(saveUser(token));
  };
  const handleResetPassword = (e) => {
    if (formdataL.email !== "") {
      e.preventDefault();
      requestResetPassword(formdataL.email);
      setShow1(false);
    }
  };
  const translateModal = () => {
    setShow(false);
    setShow1(true);
  };
  useEffect(() => {
    if (token) {
      handleUser(token);
    }
  }, []);
  const logout = () => {
    window.localStorage.removeItem("token");
    // setToken("");

    dispatch(saveToken(""));
    dispatch({ type: RESET_VEHICLES });
    dispatch({ type: "RESET_REDUX_RENT" });
    dispatch({ type: "RESET_REDUX_APPOINTMENT" });
    dispatch({ type: DELETE_USER });
    handleCloseLogout();
    navigate("/");
  };
  return (
    <>
      {showNavbar && (
        <>
          <Navbar
            collapseOnSelect
            expand="lg"
            className="bg-body-tertiary py-0 fixed-top"
          >
            <Container fluid className="px-4">
              <Navbar.Brand as={Link} to="/">
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
                  <Nav.Item>
                    <Nav.Link eventKey="1" as={Link} to="/">
                      Home
                    </Nav.Link>
                  </Nav.Item>
                  {token && (
                    <Nav.Item>
                      <Nav.Link eventKey="2" as={Link} to="/vehicle">
                        Parco Auto
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {token && (
                    <Nav.Item>
                      <Nav.Link eventKey="3" as={Link} to="/myrent">
                        Tuoi Noleggi
                      </Nav.Link>
                    </Nav.Item>
                  )}
                  {token && (
                    <Nav.Item>
                      <Nav.Link eventKey="4" as={Link} to="/myappointments">
                        Tuoi Appuntamenti
                      </Nav.Link>
                    </Nav.Item>
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
                          Ciao! {user.name} {user.surname}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item as="div" className="my-2">
                            <div>
                              <Link
                                to="/user"
                                className="text-dark text-decoration-none"
                              >
                                Dettagli Account
                              </Link>
                            </div>
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
          <Form>
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
                <Form.Group className="mb-2" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Inserisci la password"
                    onChange={(e) =>
                      setFormdataL({ ...formdataL, password: e.target.value })
                    }
                  />
                </Form.Group>
                <Form.Text
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    handleResetPassword(e);
                  }}
                >
                  Hai dimenticato la password?
                </Form.Text>
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
          </Form>
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
      )}
    </>
  );
}

export default NavbarComponent;
