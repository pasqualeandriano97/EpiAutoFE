import { Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SingleCar = (vehicle) => {
  const dispatch = useDispatch();
  const handleSelectCarRent = () => {
    dispatch({
      type: "SET_CURRENT_CAR",
      payload: vehicle.vehicle,
    });
  };
  const handleSelectCarAppointment = () => {
    dispatch({
      type: "SET_APPOINTMENT_CAR",
      payload: vehicle.vehicle,
    });
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
  return (
    <Col className="col-12 col-md-4 col-lg-3 scale">
      <Card style={{ height: "100%" }} className="cardBg">
        <Card.Img
          variant="top"
          src={vehicle.vehicle.imageUrl || "placeholder.jpg"}
          style={{ aspectRatio: "4 / 3" }}
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title>
            {vehicle.vehicle.brand} {vehicle.vehicle.model}
          </Card.Title>
          <Card.Text className="mb-1">
            {vehicle.vehicle.year} - {translateFuel(vehicle.vehicle.fuelType)}
          </Card.Text>
          <Card.Text className="flex-grow-1">
            {vehicle.vehicle.type.toUpperCase()}
          </Card.Text>
          {vehicle.vehicle.state === "AVAILABLE" ? (
            <div className="mt-auto">
              <div className="d-flex justify-content-around">
                <Link
                  to="/appointment"
                  className="btn btn-primary px-3 px-md-1 px-xl-3"
                  onClick={handleSelectCarAppointment}
                >
                  Compra
                </Link>
                <Link
                  to="/rent"
                  className="btn btn-secondary px-3 px-md-1 px-xl-3 border-1 border-dark"
                  onClick={handleSelectCarRent}
                >
                  Noleggia
                </Link>
              </div>
            </div>
          ) : (
            <p className="text-center mt-auto">
              Ci dispiace! Questo al momento veicolo non è disponibile
            </p>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleCar;
