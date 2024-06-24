import { Col, Container, Row, Image } from "react-bootstrap";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Container fluid className="py-3 rowBg border-top border-3 border-black ">
      <Row className="justify-content-center">
        <Col className="col-6 d-flex justify-content-center ">
          <Row className="d-flex align-items-start">
            <Col className="d-flex flex-column justify-content-center border-end border-1 border-light">
              <a
                className="text-center"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=andrianopasquale97@gmail.com&su=Oggetto&body=Testo%20del%20messaggio"
                target="_blank"
              >
                <Image
                  src="gmailLogo.png"
                  width="40"
                  height="40"
                  className="rounded"
                />
              </a>
              <p className="text-center mt-1">Contattami</p>
            </Col>
            <Col className="d-flex flex-column justify-content-center border-end border-1 border-light">
              <a
                className="text-center"
                href="https://github.com/pasqualeandriano97"
                target="_blank"
              >
                <Image
                  src="gitHubLogo.jpg"
                  width="40"
                  height="40"
                  className="rounded"
                />
              </a>
              <p className="text-center mt-1">GitHub</p>
            </Col>
            <Col className="d-flex flex-column justify-content-center border-end border-1 border-light">
              <a
                className="text-center"
                href="https://www.linkedin.com/in/pasquale-andriano-392b96281/"
                target="_blank"
              >
                <Image
                  src="linkedinLogo.jpg"
                  width="40"
                  height="40"
                  className="rounded"
                />
              </a>
              <p className="text-center mt-1">Linkedin</p>
            </Col>
            <Col className="d-flex flex-column justify-content-center border-end border-1 border-light">
              <a
                className="text-center"
                href="https://mail.google.com/mail/?view=cm&fs=1&to=epiautoapp24@gmail.com&su=Oggetto&body=Testo%20del%20messaggio"
                target="_blank"
              >
                <Image
                  src="logoEpi.png"
                  width="40"
                  height="40"
                  className="rounded"
                />
              </a>
              <p className="text-center mb-0">Servizio Clienti</p>
            </Col>
            <Col className="d-flex flex-column justify-content-center">
              <a
                className="text-center"
                href="https://talent.epicode.com/talent/19e475ca-4dd1-4c94-86ed-ae98b6a0e02d"
                target="_blank"
              >
                <Image
                  src="logoEpicode.jpg"
                  width="40"
                  height="40"
                  className="rounded"
                />
              </a>
              <p className="text-center ">Epicode</p>
            </Col>
          </Row>
        </Col>
        <Col className="col-12 d-flex justify-content-center">
          <p className="text-center mt-3 border-top border-black px-5 mb-0">
            © {year} EPI Auto. Tutti i diritti riservati.
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
