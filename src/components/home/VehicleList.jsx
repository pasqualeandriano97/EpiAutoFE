import { Button, Container, Row, Spinner, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getVehicles } from "../../redux/actions/vehicleActions";
import { useEffect } from "react";
import SingleCar from "./SingleCar";
import { useState } from "react";

const VehicleList = () => {
  const token = window.localStorage.getItem("token");
  const [load, setLoad] = useState(false);
  const vehicleList = useSelector((state) => state.vehicle.content);
  const loading = useSelector((state) => state.vehicle.loading);
  const tokenR = useSelector((state) => state.user.token);
  const page = useSelector((state) => state.vehicle.page);
  const firstPage = useSelector((state) => state.vehicle.firstPage);
  const lastPage = useSelector((state) => state.vehicle.lastPage);
  const dispatch = useDispatch();

  useEffect(() => {
    if (vehicleList.length === 0 && token !== null) {
      dispatch(getVehicles(token, page));
      setLoad(!load);
    }
  }, [vehicleList.length, tokenR]);
  const handleClickUp = () => {
    dispatch(getVehicles(token, page + 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const handleClickDown = () => {
    dispatch(getVehicles(token, page - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Container className="pt-5 mt-5">
      <Row className="justify-content-center g-4">
        {token === null ? (
          <div className="text-center mt-5 d-flex align-items-center justify-content-center">
            <h1 className="text-secondary">
              Effettua l&apos;accesso per consultare tutto il nostro fantastico
              parco auto!!
            </h1>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div className="text-center vh-100 d-flex align-items-center justify-content-center">
            <Spinner animation="border" variant="secondary" />
          </div>
        ) : (
          <>
            {vehicleList.map((vehicle, i) => (
              <SingleCar key={i} vehicle={vehicle} />
            ))}
            {token === null ? (
              ""
            ) : (
              <div className="d-block">
                <Col className="d-flex justify-content-center align-items-center  mb-5">
                  {firstPage ? (
                    ""
                  ) : (
                    <Button
                      variant="secondary"
                      className="border border-radius"
                      onClick={handleClickDown}
                    >
                      <i className="bi bi-arrow-left-circle"></i>
                    </Button>
                  )}
                  <p className="mx-3 mt-2  text-secondary">{page + 1}</p>
                  {lastPage ? (
                    ""
                  ) : (
                    <Button
                      variant="secondary"
                      className="border border-radius"
                      onClick={handleClickUp}
                    >
                      <i className="bi bi-arrow-right-circle"></i>
                    </Button>
                  )}
                </Col>
              </div>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default VehicleList;
