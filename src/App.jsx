import "./App.css";
import NavBarComponent from "./components/NavBar/NavBarComponent";
import "../custom.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-datepicker/dist/react-datepicker.css";
import VehicleList from "./components/home/VehicleList";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RentComponent from "./components/rent/RentComponent";
import MyRentComponent from "./components/rent/MyRentComponent";
import AppointmentComponent from "./components/appointment/AppointmentComponent";
import MyAppointmentsComponent from "./components/appointment/MyAppointmentsComponent";
import HomeComponent from "./components/home/HomeComponent";
import HomeMobileComponent from "./components/home/HomeMobileComponent";
import UserDetails from "./components/user/UserDetails";

function App() {
  return (
    <BrowserRouter>
      <header>
        <NavBarComponent />
      </header>
      <main className="background">
        <Routes>
          <Route path="/" element={<HomeComponent />} />
          <Route path="/vehicle" element={<VehicleList />} />
          <Route path="/rent" element={<RentComponent />} />
          <Route path="/myrent" element={<MyRentComponent />} />
          <Route path="/appointment" element={<AppointmentComponent />} />
          <Route path="/myappointments" element={<MyAppointmentsComponent />} />
          <Route path="/user" element={<UserDetails />} />
        </Routes>
      </main>
      <footer></footer>
    </BrowserRouter>
  );
}

export default App;
