import { useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";
import moment from "moment";
import { bookRoom, getRoom } from "../Data/DataApi";
import Swal from "sweetalert2";
const { RangePicker } = DatePicker;

const BookinigScreen = () => {
  const navigate = useNavigate();

  const [room, setRoom] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());
  const [totaldays, setTotaldays] = useState(1);
  // const [totalamount, setTotalAmount] = useState(0);
  const [duplicaterooms, setDuplicaterooms] = useState([]);

  const totalamount = room?.rentperday * totaldays;
  const { roomid } = useParams();

  console.log(todate);

  const fillterByDate = (dates) => {
    console.log(dates);
    setFromDate(dates[0].$d);
    setToDate(dates[1].$d);
    console.log(todate, fromdate);
    const diffTime = Math.abs(dates[1].$d - dates[0].$d);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setTotaldays(diffDays);
    console.log(diffDays + " days");

    var temprooms = [];
    var availiability = false;

    // for (const room of duplicaterooms)
    //     {

    //       if(room.currentbookings.length > 0) {

    //       }
    // for(booking of room.currentbookings)

    // {

    //   if (!Math.abs(dates[1].$d.isBetween(booking.fromdate , booking.todate)
    //   && dates[0].$d
    //   )

    // }

    //     }
  };

  async function bookroom() {
    const bookingDetails = {
      room,
      userid: localStorage.getItem("userId"),
      fromdate,
      todate,
      totalamount,
      totaldays,

      // transaction,
      // status,
    };
    try {
      setLoading(true);
      const result = await axios.post(
        bookRoom,

        bookingDetails
      );
      setLoading(false);
      Swal.fire(
        "congratulations",
        "your Room is Booked Successfully",
        "success"
      ).then((result) => {
        navigate("/bookings");
      });
    } catch (error) {
      setLoading(false);
      Swal.fire("Oooops", "something went wrong", "Error");
    }
  }
  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/rooms/getroombyid/" + roomid
      );
      // setTotalAmount(data?.room?.rentperday * totaldays);
      setRoom(data);
      setDuplicaterooms(data);

      setLoading(false);
      setError(false);

      console.log("data", data);
    };

    fetchRoom();
  }, []);

  async function onToken(token) {
    console.log(token);

    const bookingDetails = {
      room,
      userid: localStorage.getItem("userId"),
      fromdate,
      todate,
      totalamount,
      totaldays,
      token,
      // transaction,
      // status,
    };
    try {
      setLoading(true);
      const result = await axios.post(
        bookRoom,

        bookingDetails
      );
      setLoading(false);
      Swal.fire(
        "congratulations",
        "your Room is Booked Successfully",
        "success"
      );
    } catch (error) {
      setLoading(false);
      Swal.fire("Oooops", "something went wrong", "Error");
    }
  }

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
                    <p>Name :{localStorage.getItem("name")} </p>
                    {/* <p>From Date : {fromdate} </p>
                    <p>To Date : {todate}</p> */}
                    <RangePicker format="DD-MM-YYYY" onChange={fillterByDate} />

                    <hr />
                    <p>Max Count : {room.maxcount} </p>
                  </b>
                </div>
                <div style={{ textAlign: "right" }}>
                  <b>
                    <p>Rent Per Day : {room.rentperday} </p>

                    {/* <hr /> */}
                    <p> Amount:{room.rentperday * totaldays}</p>

                    <p>Total Days : {totaldays} </p>
                    <b>Total Amount : {totalamount}</b>
                  </b>
                </div>

                {fromdate && todate && (
                  <div>
                    <StripeCheckout
                      token={onToken}
                      currency="NGN"
                      stripeKey="pk_test_51MqCXcAZTcl4qbBLc9ydYKFbw0RCliLNR7gIgYoc4mVGUjzcCeFe0kf0WuPndQAYvgK7AUxIugxyXAJMAKpkQm24004J9yNc8u"
                      amount={totalamount * 100}
                    >
                      <button
                        className="btn btn-primary"
                        style={{ float: "right" }}
                        // onClick={bookroom}
                      >
                        Pay Now
                      </button>
                    </StripeCheckout>

                    <button
                      className="btn btn-primary"
                      style={{ float: "right" }}
                      onClick={bookroom}
                    >
                      Pay Now normal
                    </button>
                  </div>
                )}
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
