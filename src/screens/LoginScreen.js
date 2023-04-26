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
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    const user = {
      email,
      password,
    };

    try {
      const result = await axios.post(
        "http://localhost:5000/api/users/login",
        user
      ).data;
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  }
  return (
    <form
      method="POST"
      action="/submit-form"
      //   onSubmit={submitHandler}
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
              // type="submit"
              onClick={login}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Login
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </form>
  );
}

export default LoginScreen;
