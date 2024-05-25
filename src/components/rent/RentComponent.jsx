import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { setPreventive, saveRentA } from "../../redux/actions/rentActions";

const RentComponent = () => {
  const dispatch = useDispatch();
  const [show1, setShow1] = useState(false);
  const [date1, setDate1] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const token = window.localStorage.getItem("token");
  const currentCar = useSelector((state) => state.rent.currentCar);
  const preventive = useSelector((state) => state.rent.preventive);
  const rent = useSelector((state) => state.rent.currentRent);
  const show = useSelector((state) => state.rent.show);
  const handleShow1 = () => {
    setShow1(true);
  };
  const handleClose1 = () => setShow1(false);

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
  const formattedDate = dataObject.toLocaleDateString("it-IT", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  const hour = dataObject.getHours();
  const handlePreventive = () => {
    dispatch(
      setPreventive(token, {
        plate: currentCar.plate,
        startDate: formatter(startDate),
        endDate: formatter(endDate),
        date: formattedDate.replace(/\//g, "-"),
        startHour: hour,
      })
    );
  };
  const translateFuel = (fuel) => {
    switch (fuel) {
      case "GASOLINE":
        return "BENZINA";
      case "DIESEL":
        return "DIESEL";
      case "ELECTRIC":
        return "ELETTRICA";
      case "HYBRID":
        return "HYBRID";
      default:
        return "Errore";
    }
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
      saveRentA(token, {
        startDate: formatDate(preventive.startDate),
        endDate: formatDate(preventive.endDate),
        date: formatDate(preventive.date),
        time: hour,
        vehicle: preventive.vehicle.plate,
      })
    );
    handleClose();
    handleShow1();
  };

  return (
    <Container fluid className="rentBg">
      <Container style={{ paddingTop: "150px" }}>
        <Row className="justify-content-center ">
          <Col className="cardBg rounded-3 border-end border-1 border-dark col-12 col-md-5 ">
            <Row className="flex-column">
              <Col>
                <Image
                  className=" border-bottom rounded-3 px-3 pt-3 w-100"
                  src={currentCar.imageUrl}
                />
              </Col>
              <Col>
                <h1 className="text-dark ms-3">
                  {currentCar.brand} {currentCar.model}
                </h1>
                <p className="text-dark ms-3">
                  {currentCar.year} - {translateFuel(currentCar.fuelType)}
                </p>
                <p className="text-dark ms-3 border-bottom ">
                  {currentCar.type.toUpperCase()}
                </p>
                <p className="text-dark ms-3">
                  Ottima scelta!! Complila i dati del tuo noleggio per
                  prenotarla!!
                </p>
              </Col>
            </Row>
          </Col>

          <Col className="cardBg rounded-3 ms-0 ms-lg-1 my-2 my-lg-0 d-flex flex-column col-12 col-md-5">
            <div>
              <h3 className="text-dark text-center my-2 pb-2  border-bottom">
                Complila questi campi per richiedere un preventivo istantaneo!
              </h3>
            </div>
            <Row className="d-flex flex-column flex-grow-1 ">
              <Col className="d-flex flex-column justify-content-center align-items-center">
                <h5 className="text-dark mt-2">Data di inizio del noleggio</h5>
                <DatePicker
                  className="bg-light rounded-3 "
                  selectsStart
                  selected={startDate}
                  dateFormat={"dd/MM/yyyy"}
                  onChange={(date) => setStartDate(date)}
                  startDate={startDate}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center mt-3 ">
                <h5 className="text-dark ">Data di fine del noleggio</h5>
                <DatePicker
                  className="bg-light rounded-3 "
                  selectsEnd
                  selected={endDate}
                  dateFormat={"dd/MM/yyyy"}
                  onChange={(date) => setEndDate(date)}
                  endDate={endDate}
                  startDate={startDate}
                  minDate={startDate}
                />
              </Col>
              <Col className="d-flex flex-column justify-content-center align-items-center mt-3 ">
                <h5 className="text-dark ">
                  Data e ora dell&apos;appuntamento
                </h5>
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
              <Col className="d-flex flex-column justify-content-center align-items-center mt-3 pb-2 pb-lg-0">
                <Button
                  variant="primary"
                  className="border border-radius"
                  onClick={handlePreventive}
                >
                  Preventivo
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        {preventive ? (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Riepilogo prenotazione noleggio</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="d-flex">
                <div className="w-100">
                  <h5>Veicolo</h5>
                  <p>
                    {preventive.vehicle.brand} {preventive.vehicle.model}
                  </p>
                  <p>
                    {preventive.vehicle.year} -{" "}
                    {translateFuel(preventive.vehicle.fuelType)}
                  </p>
                  <p>{preventive.vehicle.type.toUpperCase()}</p>
                </div>
                <div className="w-100 h-100">
                  <Image
                    src={preventive.vehicle.imageUrl}
                    className="w-100 h-100 "
                  />
                </div>
              </div>
              <h5>Noleggio</h5>
              <p>Data inizio Noleggio: {formatDate(preventive.startDate)}</p>
              <p>Data fine Noleggio: {formatDate(preventive.endDate)}</p>
              <p>Data dell&apos;appuntamento: {formatDate(preventive.date)}</p>
              <p>Ora dell&apos;appuntamento: {preventive.time}</p>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between align-items-center">
              <h5>Prezzo: {preventive.price} &euro;</h5>
              <div>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  className="me-2"
                >
                  Chiudi
                </Button>
                <Button variant="primary" onClick={() => handleSave()}>
                  Prenota Ora
                </Button>
              </div>
            </Modal.Footer>
          </Modal>
        ) : (
          ""
        )}
        <Modal show={show1} onHide={handleClose1}>
          <Modal.Header closeButton>
            <Modal.Title>Noleggio prenotato con successo!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {" "}
            Questo è il codice che mostrerai all&apos;operatore in sede: &quot;
            {rent.id} &quot;{"\n"}Puoi consultare, modificare e annullare i tuoi
            noleggi nella sezione &quot;Tuoi Noleggi&quot;
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={handleClose1}>
              Chiudi
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Container>
  );
};

export default RentComponent;
