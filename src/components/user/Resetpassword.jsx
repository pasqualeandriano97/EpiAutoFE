import { useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { resetPassword } from "../../Data/resetPassword";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const params = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (passwordsMatch) {
      try {
        resetPassword(params.token, password);
        window.location.href = "/";
      } catch (error) {
        alert(error.message);
      }
    }
  };

  useEffect(() => {
    dispatch({ type: "HIDE_NAVBAR" });
  }, [dispatch]);

  useEffect(() => {
    setPasswordsMatch(password === confirmPassword);
  }, [password, confirmPassword]);

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col className="col-md-4 cardBg rounded">
          <Row className="flex-column align-items-center">
            <Col>
              <h3 className="text-dark text-center mt-2">
                Reimposta la tua password
              </h3>
            </Col>
            <Col className="mt-4">
              <Form>
                <Form.Group className="mb-3" controlId="formfirstPassword">
                  <Form.Label>Nuova Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formsecondPassword">
                  <Form.Label>Reinserisci la Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
                {!passwordsMatch && (
                  <div className="text-danger my-1">
                    Le password non coincidono!
                  </div>
                )}
              </Form>
            </Col>
            {passwordsMatch && password && (
              <Col className="my-3 text-center">
                <Button
                  variant="primary"
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Reimposta
                </Button>
              </Col>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPassword;
