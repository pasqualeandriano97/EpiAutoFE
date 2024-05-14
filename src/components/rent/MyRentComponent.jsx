import { getMyRentsA } from "../../redux/actions/rentActions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";

const MyRentComponent = () => {
  const dispatch = useDispatch();
  const token = window.localStorage.getItem("token");
  const myRents = useSelector((state) => state.rent.myRents);
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
                <Col className="d-flex flex-column justify-content-center ">
                  <h4 className="text-white text-center">
                    Codice Prenotazione: {rent.id}
                  </h4>
                  <h4 className="text-white text-center">
                    Totale: {rent.price} €
                  </h4>
                </Col>
              </Row>
            </Col>
          ))}
      </Row>
    </Container>
  );
};

export default MyRentComponent;
