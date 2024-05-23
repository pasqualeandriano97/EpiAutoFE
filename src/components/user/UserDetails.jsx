import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  saveUser,
  updateUserA,
  deleteUserA,
} from "../../redux/actions/userActions";
import { RESET_VEHICLES } from "../../redux/actions/vehicleActions";
import { saveToken } from "../../redux/actions/userActions";

const UserDetails = () => {
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const user = useSelector((state) => state.user.user);
  const formData = {
    name: user.name,
    surname: user.surname,
    email: user.email,
  };

  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleModify = (e) => {
    e.preventDefault();
    if (!isCheckboxChecked) {
      setErrorMessage("Devi confermare le modifiche prima di salvare.");
      return;
    }
    dispatch(updateUserA(token, formData));
    dispatch(saveUser(token));
    setShow(false);
  };
  const handleShow = () => setShow1(true);
  const handleClose = () => setShow1(false);
  useEffect(() => {
    dispatch(saveUser(token));
  }, []);
  const handleDelete = () => {
    dispatch(deleteUserA(token));
    dispatch({ type: "DELETE_USER" });
    dispatch(saveToken(""));
    window.localStorage.removeItem("token");
    dispatch({ type: RESET_VEHICLES });
    dispatch({ type: "RESET_REDUX_RENT" });
    dispatch({ type: "RESET_REDUX_APPOINTMENT" });
    navigate("/");
  };
  return (
    <Container style={{ marginTop: "100px" }}>
      {user && (
        <Row className="justify-content-center">
          <Col className="col-12 col-md-6 col-lg-4 bg-body-secondary rounded-3 p-3 mx-3">
            <h1 className="text-dark text-center my-3 border-bottom border-secondary ">
              IL TUO PROFILO
            </h1>
            <h3 className="text-dark text-center my-3">Nome e cognome</h3>
            <p className="text-dark text-center my-3">
              {user.name} {user.surname}
            </p>
            <h3 className="text-dark text-center my-3">Email</h3>
            <p className="text-dark text-center my-3">{user.email}</p>
            <div className="d-flex justify-content-center mb-3">
              <Button
                variant="primary"
                className="me-2"
                onClick={() => {
                  setShow(true);
                }}
              >
                Modifica
              </Button>
              <Button variant="secondary" onClick={handleShow}>
                Elimina
              </Button>
            </div>
          </Col>
          {show && (
            <Col className="col-12 col-md-6 col-lg-4 bg-body-secondary rounded-3 p-3">
              <h1 className="text-dark text-center my-3 border-bottom border-secondary ">
                MODIFICA
              </h1>
              <Form>
                <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.name}
                    onChange={(e) => (formData.name = e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="surname">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.surname}
                    onChange={(e) => (formData.surname = e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    onChange={(e) => (formData.email = e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Conferma le modifiche"
                    onChange={(e) => setIsCheckboxChecked(e.target.checked)}
                  />
                </Form.Group>
                {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
              </Form>
              <div className="d-flex justify-content-center mb-3">
                <Button
                  variant="primary"
                  className="me-2"
                  onClick={(e) => {
                    handleModify(e);
                  }}
                >
                  Salva
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShow(false);
                  }}
                >
                  Annulla
                </Button>
              </div>
            </Col>
          )}
        </Row>
      )}
      <Modal show={show1} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>Arrivederci!</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>Sei sicuro di voler eliminare il tuo profilo?</p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Annulla
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Conferma
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </Container>
  );
};

export default UserDetails;
