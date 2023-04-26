import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Error from "../components/Error";

const BookinigScreen = () => {
  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const { roomid } = useParams();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/rooms/getroombyid/" + roomid
      );
      setRoom(data);
      console.log("yea", data);
      setLoading(false);
      setError(false);

      console.log("data", data);
    };

    fetchRoom();
  }, []);

  return (
    <div className="m-5">
      {/* <Container> */}
      <div
      // className="container"
      >
        {loading ? (
          <Loader />
        ) : room ? (
          <div>
            <div className="row justify-content-center bs">
              <div className="col-md-6">
                <h1>{room?.name}</h1>
                <img src={room?.imageurls[0]} alt="tyc" className="bigimg" />
              </div>

              <div className="col-md-4" style={{ textAlign: "right" }}>
                <div>
                  {" "}
                  <h1>Booking Details</h1>
                  {/* <hr  /> */}
                  <b>
                    <p>Name : </p>
                    <p>From Date : </p>
                    <p>To Date : </p>
                    <p>Max Count : {room.maxcount} </p>
                  </b>
                </div>
                <div style={{ textAlign: "right" }}>
                  <b>
                    <h1>Amount</h1>
                    {/* <hr /> */}
                    <p>Total Days : </p>
                    <p>Rent Per Day : {room.rentperday} </p>
                    <p>Total Amount </p>
                  </b>
                </div>
                <div>
                  <button
                    className="btn btn-primary"
                    style={{ float: "right" }}
                  >
                    Pay Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </div>
      {/* </Container> */}
    </div>
  );
};

export default BookinigScreen;
