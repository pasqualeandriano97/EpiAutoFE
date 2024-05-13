import { Container, Row, Col, Image, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { setPreventive } from "../../redux/actions/rentActions";

const RentComponent = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(new Date());
  const [date1, setDate1] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const token = window.localStorage.getItem("token");
  const currentCar = useSelector((state) => state.rent.currentCar);
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
                Ottima scelta!! Complila i dati del tuo noleggio per
                prenotarla!!
              </p>
            </Col>
          </Row>
        </Col>
        <Col
          md={5}
          className="bg-light rounded-3 border-start border-3 border-dark"
        >
          <Row className="flex-column justify-content-center align-items-center">
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
              <h5 className="text-dark ">Data e ora di ritiro del veicolo</h5>
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
                onClick={handlePreventive}
              >
                Preventivo
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default RentComponent;
