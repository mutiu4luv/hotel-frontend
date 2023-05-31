import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import AdminScreen from "./screens/AdminScreen";
import BookinigScreen from "./screens/BookinigScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import ProfileScreen from "./screens/ProfileScreen";
import RegistrationScreen from "./screens/RegistrationScreen";
import { Redirect } from "react-router-dom";
import LandingPageScreen from "./screens/LandingPageScreen";

function App() {
  const Admin = localStorage.getItem("isAdmin") === "true";
  const userId = localStorage.getItem("userId");

  return (
    <div className="App">
      <Navbar />
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/booking/:roomid" element={<BookinigScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegistrationScreen />} />
        <Route path="/profile" element={<ProfileScreen />} />
        <Route path="/" element={<LandingPageScreen />} />
        <Route
          path="/admin"
          element={Admin ? <AdminScreen /> : <HomeScreen />}
        />
      </Routes>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
