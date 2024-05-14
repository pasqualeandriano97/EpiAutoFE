import "./App.css";
import NavBarComponent from "./components/NavBar/NavBarComponent";
import "../custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.css";
import VehicleList from "./components/home/VehicleList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RentComponent from "./components/rent/RentComponent";
import MyRentComponent from "./components/rent/MyRentComponent";
function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBarComponent />
      </header>
      <main className="root">
        <Routes>
          <Route path="/" element={<VehicleList />} />
          <Route path="/rent" element={<RentComponent />} />
          <Route path="/myrent" element={<MyRentComponent />} />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
