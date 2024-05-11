import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getVehicles } from "../../redux/actions/vehicleActions";

const Test = () => {
  const token = window.localStorage.getItem("token");
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(getVehicles(token, 0));
  };
  return (
    <Button variant="success" onClick={handleClick}>
      Fetch
    </Button>
  );
};

export default Test;
