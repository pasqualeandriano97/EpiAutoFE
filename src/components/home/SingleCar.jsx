import { Col, Card, Button } from "react-bootstrap";

const SingleCar = (vehicle) => {
  console.log(vehicle);
  return (
    <Col className="col-12 col-md-4 col-lg-3">
      <Card>
        <Card.Img
          variant="top"
          src={vehicle.vehicle.imageUrl}
          style={{ aspectRatio: "4.5 / 3" }}
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
            <Button variant="secondary">Noleggia</Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default SingleCar;
