import {
  getMyAppointmentsA,
  postAppointmentA,
  deleteAppointmentA,
} from "../../redux/actions/appointmentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";

const MyAppointmentsComponent = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const myAppointments = useSelector(
    (state) => state.appointment.myAppointments
  );
  const show = useSelector((state) => state.appointment.show);
  const currentCar = useSelector(
    (state) => state.appointment.currentAppointment
  );
  const [date1, setDate1] = useState();
  const handleClose = () => dispatch(dispatch({ type: "HIDE_MODAL" }));
  const handleShow = (current) => {
    dispatch({ type: "SHOW_MODAL" });
    dispatch({ type: "SET_APPOINTMENT", payload: current });
  };
  useEffect(() => {
    if (myAppointments.length === 0) {
      dispatch(getMyAppointmentsA(token));
    }
  }, []);
  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
  const getHour = (date) => {
    const newDate = new Date(date);
    const hour = newDate.getHours();
    return hour;
  };
  const handleDelete = (rentId) => {
    dispatch(deleteAppointmentA(token, rentId));
  };
  const handleModify = (rentId) => {
    dispatch(
      postAppointmentA(token, rentId, {
        date: formatDate(date1),
        hour: getHour(date1),
      })
    );
  };

  return (
    <Container style={{ marginTop: "100px" }}>
      <h1 className="text-white text-center ">
        Qui c&apos;è la lista dei tuoi Appuntamenti!!
      </h1>
      <h1 className="text-white text-center mb-5">Grazie per averci scelto!</h1>
      <Row>
        {myAppointments &&
          myAppointments.map((appointment) => (
            <Col key={appointment.id} className="col-12">
              <Row className="bg-secondary rounded-3 mb-3 p-2">
                <Col className="col-4">
                  <Image
                    src={appointment.vehicle.imageUrl}
                    className="w-100 h-100"
                  />
                </Col>
                <Col className="d-flex flex-column justify-content-center">
                  <h4 className="text-white text-center">
                    {appointment.vehicle.brand} {appointment.vehicle.model}
                  </h4>
                  <p className="text-white text-center">
                    {appointment.vehicle.year} - {appointment.vehicle.fuelType}
                  </p>
                </Col>
                <Col className="d-flex flex-column justify-content-center ">
                  <p className="text-white text-center mb-0 ">
                    Data dell&apos;appuntamento:
                  </p>
                  <p className="text-white text-center ">
                    {formatDate(appointment.date)}
                  </p>
                  <p className="text-white text-center mb-0 ">
                    Ora dell&apos;appuntamento:
                  </p>
                  <p className="text-white text-center ">{appointment.hour}</p>
                </Col>
                <Col className="d-flex flex-column justify-content-between ">
                  <div className="pt-5">
                    <h4 className="text-white text-center">
                      Codice Prenotazione: {appointment.id}
                    </h4>
                  </div>
                  <div className="d-flex justify-content-center pb-5 ">
                    <Button
                      variant="secondary"
                      className="border-2 border-white me-3"
                      onClick={() => {
                        handleShow(appointment);
                      }}
                    >
                      Modifica
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleDelete(appointment.id);
                      }}
                    >
                      Cancella
                    </Button>
                  </div>
                </Col>
              </Row>
              {currentCar && (
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      Non riesci ad esserci quel giorno? Puoi posticipare qui!
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <h5> Dettagli appuntamento</h5>
                    <p>
                      {currentCar.vehicle.brand} {currentCar.vehicle.model}
                    </p>
                    <p>
                      {currentCar.vehicle.year} - {currentCar.vehicle.fuelType}
                    </p>
                    <p>
                      Data dell&apos;appuntamento: {formatDate(currentCar.date)}
                    </p>
                    <p>Inserisci la nuova data dell&apos;appuntamento</p>
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
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Annulla
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => {
                        handleModify(currentCar.id);
                        handleClose();
                      }}
                    >
                      Posticipa
                    </Button>
                  </Modal.Footer>
                </Modal>
              )}
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default MyAppointmentsComponent;
