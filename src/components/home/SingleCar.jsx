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
      <Card>
        <Card.Img
          variant="top"
          src={vehicle.vehicle.imageUrl || "placeholder.jpg"}
          style={{ aspectRatio: "4 / 3" }}
        />
        <Card.Body>
          <Card.Title>
            {vehicle.vehicle.brand} {vehicle.vehicle.model}
          </Card.Title>
          <Card.Text className="mb-1">
            {vehicle.vehicle.year} - {vehicle.vehicle.fuelType}
          </Card.Text>
          <Card.Text>{vehicle.vehicle.type.toUpperCase()}</Card.Text>
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
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleCar;
