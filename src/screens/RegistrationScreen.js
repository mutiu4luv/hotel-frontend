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
import Loader from "../components/Loader";
import Error from "../components/Error";
import Success from "../components/Success";
import { userRegister } from "../Data/DataApi";

function RegistrationScreen() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const navigate = useNavigate();

  async function register() {
    if (password === confirmPassword) {
      const user = {
        name,
        email,
        password,
        confirmPassword,
      };
      console.log(user);

      try {
        setLoading(true);
        const result = await axios.post(userRegister, user).data;
        setLoading(false);
        setSuccess(true);

        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        navigate("/home");
      } catch (error) {
        console.log(error);
        setLoading(false);
        setError(true);
      }
    } else {
      alert("passwords not matched");
    }
  }
  //   const Register = () => {
  //     const navigate = useNavigate();
  //     const [name, setName] = useState("");
  //     const [email, setEmail] = useState("");

  //     const [password, setPassword] = useState("");
  //     const [confirmPassword, setConfirmPassword] = useState("");

  //     const [loading, setLoading] = useState(false);
  //   };

  //   // axios.post("https://sfcoba.herokuapp.com/api/auth/register", data, headers);
  // }
  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   const data = {
  //     email: email,
  //     name: name,
  //     password: password,
  //     confirmPassword: confirmPassword,
  //   };

  //   const headers = {
  //     "Custom-Header": "xxxx-xxxx-xxxx-xxxx",
  //     "Content-Type": "application/json",
  //     // Accept: "application/json",
  //     // body: JSON.stringify(data),
  //   };

  return (
    <div>
      {loading && <Loader />}
      {error && <Error />}
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
              Create an account
            </h2>
            {success && <Success message="Registration Successful" />}

            <TextField
              // wrapperClass="mb-4"
              label="Your Name"
              size="lg"
              id="form1"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="m-2"
            />
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
            <TextField
              // wrapperClass="mb-4"
              label="Repeat your password"
              size="lg"
              id="form4"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              className="m-2"
            />

            <div className="d-flex flex-row justify-content-center mb-4 m-2">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I agree all statements in Terms of service"
              />
            </div>
            <Button
              variant="contained"
              // type="submit"
              onClick={register}
              className="mb-4 w-100 gradient-custom-4"
              size="lg"
            >
              Register
            </Button>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </div>
  );
}

export default RegistrationScreen;
