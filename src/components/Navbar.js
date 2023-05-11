import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const user = localStorage.getItem("name");
  const navigate = useNavigate();

  // const logout = () => {
  //   localStorage.setItem("email", "");
  //   localStorage.setItem("name", "");
  //   localStorage.setItem("userId", "");
  //   localStorage.setItem("isAdmin", "");

  //   navigate("/login");
  // };

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");

    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg ">
        <a className="navbar-brand" href="/">
          Mutiu Hotel
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon">
            {" "}
            <i class="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mr-5">
            {user ? (
              <>
                <div class="dropdown">
                  <a
                    class="btn btn-secondary dropdown-toggle"
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <i className="fa fa-user mr-3"></i>
                    {user}
                  </a>

                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <a class="dropdown-item" href="/bookings">
                      Bookings
                    </a>
                    <Button class="dropdown-item" onClick={logout}>
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/login">
                    Login
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
