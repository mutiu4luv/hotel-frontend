import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Data/DataApi";

function LoginScreen() {
  const navigate = useNavigate();
  // const redirect = location.search ? location.search.split("=")[1] : "/";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const userId = localStorage.getItem("userId");

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      email: email,

      password: password,
    };

    const headers = {
      "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
      "Content-Type": "application/json",
      // Accept: "application/json",
      // body: JSON.stringify(data),
    };

    axios
      .post(login, data, headers)
      .then((res) => {
        console.log(res.data);
        setLoading(false);

        if (res.data) {
          setEmail("");

          setPassword("");

          //   const items = data;
          //   localStorage.setItem("User-Info", JSON.stringify(items));

          localStorage.setItem("email", res.data.email);

          localStorage.setItem("name", res.data.name);
          localStorage.setItem("userId", res.data._id);
          localStorage.setItem("isAdmin", res.data.isAdmin);

          console.log(res.data);
          //   navigate("/home");
          {
            localStorage.getItem("isAdmin") === "true"
              ? navigate("/admin")
              : navigate("/home");
          }
        } else {
          alert("Login sucessful");
          // toast.error(res.data.error);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(error);
        setLoading(false);
        setError(true);
        // toast.error("Invalid email & Password");
      });
  };
  return (
    <div>
      {loading && <Loader />}
      <form
        onSubmit={submitHandler}
        // method="POST"
        // action="/submit-form"
      >
        <MDBContainer
          fluid
          className="d-flex align-items-center justify-content-center bg-image"
          style={{
            height: "100vh",
            backgroundImage:
              "url(https://mdbcdn.b-cdn.net/img/Photos/new-templates/search-box/img4.webp)",
          }}
        >
          <div className="mask gradient-custom-3"></div>
          <MDBCard className="m-5" style={{ maxWidth: "600px" }}>
            <MDBCardBody className="px-5 ">
              <h2 className="text-uppercase text-center mb-5">
                Login to your account
              </h2>
              {error && <Error message="Invalid Email or Password" />}
              <TextField
                // wrapperClass="mb-4"
                label="Your Email"
                size="lg"
                id="form2"
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="m-2"
              />
              <TextField
                // wrapperClass="mb-4"
                label="Password"
                size="lg"
                id="form3"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="m-2"
              />

              <div className="d-flex flex-row justify-content-center mb-4 m-2"></div>
              <Button
                variant="contained"
                type="submit"
                // onClick={login}
                className="mb-4 w-100 gradient-custom-4"
                size="lg"
              >
                Login
              </Button>
              <Link to="/register" className="text-align-center">
                {" "}
                If Not a Member Register Here
              </Link>
            </MDBCardBody>
          </MDBCard>
        </MDBContainer>
      </form>
    </div>
  );
}

export default LoginScreen;
