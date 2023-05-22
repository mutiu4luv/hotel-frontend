import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import axios from "axios";
import Loader from "../components/Loader";
import { getRoom } from "../Data/DataApi";
import { useNavigate } from "react-router-dom";
import AdminAddRoomScreen from "./AdminAddRoomScreen";

const { TabPane } = Tabs;
const navigate = useNavigate;

const AdminScreen = () => {
  // useEffect(() => {
  //   if (!localStorage.getItem("isAdmin")) {
  //     window.location.href = "/home";
  //     navigate("/home");
  //   }
  // }, []);
  return (
    <div className="mt-3 ml-3 bs mr-3">
      <h2
        className="text-center "
        style={{ fontSize: "40px", fontWeight: "800" }}
      >
        <b>Admin Panel</b>
      </h2>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Bookings" key="1">
          <Bookings />
          <br />
        </TabPane>

        <TabPane tab="Rooms" key="2">
          <Rooms />
        </TabPane>
        <TabPane tab="Add Rooms" key="3">
          {" "}
          <AdminAddRoomScreen />{" "}
        </TabPane>
        <TabPane tab="users" key="4">
          <Users />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default AdminScreen;

// BOOKING LIST COMPONENTS

export function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/bookings/getbookings"
      );

      setBookings(data.bookings);
      setLoading(false);

      console.log("data", data);
      setError(error);
    };

    fetchRoom();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1> Bookings</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Booking Id</th>
              <th>User Id</th>
              <th>Room</th>
              <th>From</th>
              <th>To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {bookings.length &&
              bookings.map((booking) => {
                return (
                  <tr>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromdate}</td>
                    <td>{booking.todate}</td>
                    <td>{booking.status}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ROOM LIST COMPONENTS

export function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(getRoom);

      setRooms(data.rooms);
      setLoading(false);

      console.log("data", data);
      setError(error);
    };

    fetchRoom();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1> Rooms</h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>Room Id</th>
              <th>Name</th>
              <th>Type</th>
              <th>Rent Per Day</th>
              <th>Max Count</th>
              <th>Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {rooms.length &&
              rooms.map((room) => {
                return (
                  <tr>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentperday}</td>
                    <td>{room.maxcount}</td>
                    <td>{room.phonenumber}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// USER LIST COMPONENTS

export function Users() {
  const [users, setUsers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchRoom = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/users/getallusers"
      );

      setUsers(data.users);
      setLoading(false);

      console.log("data", data);
      setError(error);
    };

    fetchRoom();
  }, []);

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Users </h1>
        {loading && <Loader />}
        <table className="table table-bordered table-dark">
          <thead className="bs">
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>isAdmin</th>
              <th>Created At</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {users.length &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    {/* <td>{user?.isAdmin ? "YES " : "NO"}</td> */}
                    <td>{user?.isAdmin.toString()}</td>
                    <td>{user.createdAt}</td>

                    <td>
                      <button
                        style={{ color: "white", backgroundColor: "white" }}
                      >
                        <i
                          className="bi bi-trash"
                          style={{ color: "white", backgroundColor: "white" }}
                        ></i>
                      </button>
                    </td>
                    <td></td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
