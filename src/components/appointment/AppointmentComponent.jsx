import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import {
  saveAppointmentA,
  setSummaryA,
} from "../../redux/actions/appointmentActions";

const AppointmentComponent = () => {
  const dispatch = useDispatch();
  const [date1, setDate1] = useState();
  const token = window.localStorage.getItem("token");
  const currentCar = useSelector((state) => state.appointment.currentCar);
  const summary = useSelector((state) => state.appointment.summary);
  const show = useSelector((state) => state.appointment.show);

  const formatter = (string) => {
    const date = new Date(string);
    const formattedDate = date.toLocaleDateString("it-IT", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate.replace(/\//g, "-");
  };
  const dataObject = new Date(date1);
  const hour = dataObject.getHours();
  const handleSummary = () => {
    dispatch(
      setSummaryA(token, {
        date: formatter(date1),
        hour: hour,
        vehicle: currentCar.plate,
      })
    );
    console.log(show);
  };
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const handleClose = () => {
    dispatch({ type: "HIDE_MODAL" });
  };

  const handleSave = () => {
    dispatch(
      saveAppointmentA(token, {
        date: formatDate(summary.date),
        hour: hour,
        vehicle: summary.vehicle.plate,
      })
    );
    handleClose();
  };

  return (
    <Container style={{ marginTop: "150px" }}>
      <Row className="justify-content-center ">
        <Col
          md={5}
          className="bg-light rounded-3 border-end border-1 border-dark"
        >
          <Row className="flex-column">
            <Col>
              <Image
                className="bg-light border-bottom rounded-3 px-3 pt-3 w-100"
                src={currentCar.imageUrl}
              />
            </Col>
            <Col>
              <h1 className="text-dark ms-3">
                {currentCar.brand} {currentCar.model}
              </h1>
              <p className="text-dark ms-3">
                {currentCar.year} - {currentCar.fuelType}
              </p>
              <p className="text-dark ms-3 border-bottom ">
                {currentCar.type.toUpperCase()}
              </p>
              <p className="text-dark ms-3">
                Ottima scelta!! Complila i dati del tuo appuntamento per
                prenotarla!!
              </p>
            </Col>
          </Row>
        </Col>

        <Col
          md={5}
          className="bg-light rounded-3 border-start border-3 border-dark d-flex flex-column"
        >
          <div>
            <h3 className="text-dark text-center my-2 pb-2  border-bottom">
              Complila questi campi per fissare un appuntamento!
            </h3>
          </div>
          <Row className="d-flex flex-column flex-grow-1 ">
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3 ">
              <h5 className="text-dark ">Data e ora dell&apos;appuntamento</h5>
              <DatePicker
                selected={date1}
                className="bg-light rounded-3 "
                dateFormat={"dd/MM/yyyy"}
                timeIntervals={60}
                showTimeSelect
                minTime={new Date(0, 0, 0, 8, 0)}
                maxTime={new Date(0, 0, 0, 18, 0)}
                onChange={(date) => {
                  setDate1(date);
                  console.log("Selected date:", date);
                }}
              />
            </Col>
            <Col className="d-flex flex-column justify-content-center align-items-center mt-3 ">
              <Button
                variant="primary"
                className="border border-radius"
                onClick={handleSummary}
              >
                Riepilogo
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      {summary ? (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Riepilogo prenotazione noleggio</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex">
              <div className="w-100">
                <h5>Veicolo</h5>
                <p>
                  {summary.vehicle.brand} {summary.vehicle.model}
                </p>
                <p>
                  {summary.vehicle.year} - {summary.vehicle.fuelType}
                </p>
                <p>{summary.vehicle.type.toUpperCase()}</p>
              </div>
              <div className="w-100 h-100">
                <Image
                  src={summary.vehicle.imageUrl}
                  className="w-100 h-100 "
                />
              </div>
            </div>
            <h5>Appuntamento</h5>
            <p>Data dell&apos;appuntamento: {formatDate(summary.date)}</p>
            <p>Ora dell&apos;appuntamento: {summary.hour}</p>
          </Modal.Body>
          <Modal.Footer className="d-flex justify-content-between align-items-center">
            <div>
              <Button
                variant="secondary"
                onClick={handleClose}
                className="me-2"
              >
                Chiudi
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Prenota Ora
              </Button>
            </div>
          </Modal.Footer>
        </Modal>
      ) : (
        ""
      )}
    </Container>
  );
};

export default AppointmentComponent;
