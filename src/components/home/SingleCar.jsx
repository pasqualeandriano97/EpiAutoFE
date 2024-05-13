import { Col, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SingleCar = (vehicle) => {
  const dispatch = useDispatch();
  const handleSelectCar = () => {
    dispatch({
      type: "SET_CURRENT_CAR",
      payload: vehicle.vehicle,
    });
  };
  return (
    <Col className="col-12 col-md-4 col-lg-3">
      <Card style={{ height: "100%" }}>
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
            {vehicle.vehicle.year} - {vehicle.vehicle.fuelType}
          </Card.Text>
          <Card.Text className="flex-grow-1">
            {vehicle.vehicle.type.toUpperCase()}
          </Card.Text>
          {vehicle.vehicle.state === "AVAILABLE" ? (
            <div className="mt-auto">
              <div className="d-flex justify-content-around">
                <Button variant="primary">Compra</Button>
                <Link
                  to="/rent"
                  className="btn btn-secondary"
                  onClick={handleSelectCar}
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
