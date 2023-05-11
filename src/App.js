import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import BookinigScreen from "./screens/BookinigScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegistrationScreen from "./screens/RegistrationScreen";

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/booking/:roomid" element={<BookinigScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
