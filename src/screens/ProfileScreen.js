import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Error from "../components/Error";
import Loader from "../components/Loader";
import { Button } from "@mui/material";
import Swal from "sweetalert2";
import { Divider, Space, Tag } from "antd";

const { TabPane } = Tabs;

const ProfileScreen = () => {
  const user = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin");

  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  return (
    <div className="ml-3 mt-5">
      <Tabs
        defaultActiveKey="1"
        //    items={items} onChange={onChange}
      >
        <TabPane tab="Profile" key="1">
          <h1> My Profile</h1>

          <br />

          <h1>Name:{user}</h1>
          <h1>Email:{email}</h1>
          <h1>isAdmin:{isAdmin === "true" ? <>YES</> : <>NO</>}</h1>
        </TabPane>

        <TabPane tab="Bookings" key="2">
          <MyBookings />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProfileScreen;

export function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const user = localStorage.getItem("name");
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("isAdmin");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoom = async () => {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:5000/api/bookings/getbookingbyuserid",
        { userid: user._id }
      );

      setBookings(data.bookings);
      setLoading(false);

      console.log("data", data);
      setError(error);
    };

    fetchRoom();
  }, []);

  const cancelBooking = async () => {
    try {
      setLoading(true);

      const result = await axios.put(
        "http://localhost:5000/api/bookings/updateiscancelled"
      );
      console.log("result", result);
      setLoading(false);
      Swal.fire(
        "congratulations",
        " Your booking has been cancelled",
        "success"
      ).then((result) => {
        navigate("/profile");

        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("ooops", "something went wrong", "error");
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-md-6">
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => (
              <div className="bs">
                {" "}
                return
                <h1>{booking.room}</h1>
                <p>
                  <b>Bookingid</b> : {booking._id}
                </p>
                <p>
                  <b>Checkin</b> : {booking.fromdate}
                </p>
                <p>
                  <b>Check out </b>: {booking.todate}
                </p>
                <p>
                  <b>Amount</b> : {booking.totalamount}
                </p>
                <p>
                  <b>Status</b> :{" "}
                  {booking.status == "booked" ? (
                    <Tag color="green">CONFIRMED</Tag>
                  ) : (
                    <Tag color="red">CANCELLED</Tag>
                  )}
                </p>
                {booking.status !== "cancelled" && (
                  <div className="text-right">
                    <Button
                      className="btn btn-primary"
                      onClick={() => {
                        cancelBooking(booking._id, booking.roomid);
                      }}
                    >
                      CANCEL BOOKING{" "}
                    </Button>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>{" "}
    </div>
  );
}
