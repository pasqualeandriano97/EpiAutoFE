import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../redux/actions/vehicleActions";
import { useEffect } from "react";
import SingleCar from "./SingleCar";
// import { useEffect } from "react";

const VehicleList = () => {
  const token = window.localStorage.getItem("token");
  const vehicleList = useSelector((state) => state.vehicle.content);
  console.log(vehicleList);
  const dispatch = useDispatch();
  //
  useEffect(() => {
    // Controlla se l'array 'vehicles' è vuoto e poi fa il dispatch
    if (vehicleList.length === 0) {
      dispatch(getVehicles(token, 6));
    }
  }, [dispatch, vehicleList.length]);

  return (
    <Container className="pt-5">
      <Row className="justify-content-center g-4">
        {vehicleList.length === 0 ? (
          <p>Loading...</p>
        ) : (
          vehicleList.map((vehicle, i) => (
            <SingleCar key={i} vehicle={vehicle} />
          ))
        )}
      </Row>
    </Container>
  );
};

export default VehicleList;
