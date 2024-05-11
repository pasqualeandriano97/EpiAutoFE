import "./App.css";
import NavBarComponent from "./components/NavBar/NavBarComponent";
import "../custom.css";
import VehicleList from "./components/home/VehicleList";

function App() {
  return (
    <>
      <header>
        <NavBarComponent />
      </header>
      <main className="root">
        <VehicleList />
      </main>
      <footer></footer>
    </>
  );
}

export default App;
