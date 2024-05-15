import {
  getMyRentsA,
  deleteRentA,
  postRentA,
} from "../../redux/actions/rentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const MyRentComponent = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const myRents = useSelector((state) => state.rent.myRents);
  const [show, setShow] = useState(false);
  const [date1, setDate1] = useState();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    if (myRents.content === undefined) {
      dispatch(getMyRentsA(token));
    }
  }, []);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const handleDelete = (rentId) => {
    dispatch(deleteRentA(token, rentId));
    dispatch(getMyRentsA(token));
  };
  const handleModify = (rentId) => {
    dispatch(
      postRentA(token, rentId, {
        postDate: formatDate(date1),
      })
    );
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1 className="text-white text-center mb-5">
        Qui c&apos;è la lista dei tuoi Noleggi!!Grazie per averci scelto!
      </h1>
      <Row>
        {myRents.content &&
          myRents.content.map((rent) => (
            <Col key={rent.id} className="col-12">
              <Row className="bg-secondary rounded-3 mb-3 p-2">
                <Col className="col-4">
                  <Image src={rent.vehicle.imageUrl} className="w-100 h-100" />
                </Col>
                <Col className="d-flex flex-column justify-content-center">
                  <h4 className="text-white text-center">
                    {rent.vehicle.brand} {rent.vehicle.model}
                  </h4>
                  <p className="text-white text-center">
                    {rent.vehicle.year} - {rent.vehicle.fuelType}
                  </p>
                </Col>
                <Col className="d-flex flex-column justify-content-center ">
                  <p className="text-white text-center mb-0 ">
                    Data di inizio del noleggio:
                  </p>
                  <p className="text-white text-center ">
                    {formatDate(rent.startDate)}
                  </p>
                  <p className="text-white text-center mb-0 ">
                    Data di fine del noleggio:
                  </p>
                  <p className="text-white text-center ">
                    {formatDate(rent.endDate)}
                  </p>
                  <p className="text-white text-center mb-0 ">
                    Data dell&apos;appuntamento:
                  </p>
                  <p className="text-white text-center ">
                    {formatDate(rent.date)}
                  </p>
                </Col>
                <Col className="d-flex flex-column justify-content-between ">
                  <div className="pt-5">
                    <h4 className="text-white text-center">
                      Codice Prenotazione: {rent.id}
                    </h4>
                    <h4 className="text-white text-center">
                      Totale: {rent.price} €
                    </h4>
                  </div>
                  <div className="d-flex justify-content-center pb-5 ">
                    <Button
                      variant="secondary"
                      className="border-2 border-white me-3"
                      onClick={() => {
                        handleShow();
                      }}
                    >
                      Modifica
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleDelete(rent.id);
                      }}
                    >
                      Cancella
                    </Button>
                  </div>
                </Col>
              </Row>
              <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>
                    Non ti basta il tempo? Puoi posticipare la fine qui!
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <h5> Dettagli noleggio</h5>
                  <p>
                    {rent.vehicle.brand} {rent.vehicle.model}
                  </p>
                  <p>
                    {rent.vehicle.year} - {rent.vehicle.fuelType}
                  </p>
                  <p>
                    Data di inizio del noleggio: {formatDate(rent.startDate)}
                  </p>
                  <p>Data di fine del noleggio: {formatDate(rent.endDate)}</p>
                  <p>Inserisci la nuova data di fine del noleggio</p>
                  <DatePicker
                    selected={date1}
                    className="bg-light rounded-3 "
                    dateFormat={"dd/MM/yyyy"}
                    minDate={rent.endDate}
                    onChange={(date) => {
                      setDate1(date);
                      console.log("Selected date:", date);
                    }}
                  />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Annulla
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      handleModify(rent.id);
                      handleClose();
                    }}
                  >
                    Posticipa
                  </Button>
                </Modal.Footer>
              </Modal>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default MyRentComponent;
