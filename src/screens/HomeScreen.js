import axios from "axios";
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import { DatePicker, Space } from "antd";

import moment from "moment";
import { getRoom } from "../Data/DataApi";
import { Grid } from "@mui/material";
// import "antd/distantd.css";

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [filterRooms, setFilterRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  const [searchkey, setSearchkey] = useState("");
  const [type, setType] = useState("all");
  const [searchtwo, setSearchtwo] = useState([]);
  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await axios.get(getRoom);
      setRooms(data.rooms);
      setSearchtwo(data.rooms);
      console.log("two", searchtwo);
      setLoading(false);
      setError(false);

      console.log("data", data);
    };
    fetchHotels();
  }, []);

  // function fillterByDate(dates) {
  //   console.log(dates);
  // }

  // const fillterByDate = (dates) => {

  //   console.log("date", moment(dates[0].$d).format("MMMM Do YYYY, h:mm:ss a"));
  //   setFromDate(moment(dates[0].$d).format("MMMM Do YYYY, h:mm:ss a"));
  //   setToDate(moment(dates[1].$d).format("MMMM Do YYYY, h:mm:ss a"));
  // };
  // const submitHandler = (e) => {
  //   e.preventDefault();

  //   setFromDate(fromdate);
  //   setToDate(todate);

  //   localStorage.setItem("todate", todate);
  //   localStorage.setItem("fromdate", fromdate);
  // };

  // function filterBySearch(data) {
  //   const temprooms = data.rooms.filter((room) =>
  //     room.name.toLowerCase().includes(searchkey.toLowerCase())
  //   );
  //   setRooms(temprooms);
  // }

  const handleChange = (event) => {
    console.log("search", searchtwo, event.target.value, rooms);

    const results = searchtwo?.filter((room) =>
      room.name.toLowerCase().includes(event.target.value.toLowerCase())
    );

    console.log(results);
    setRooms(results);

    console.log(event.target.value);
  };

  const filterByType = (data) => {
    const results = searchtwo.filter(
      (room) => room.type.toLowerCase() == data.toLowerCase()
    );
    console.log(results);
    setRooms(results);
  };

  return (
    <div className="container">
      <div className="row mt-5 bs">
        {/* <form onSubmit={submitHandler}>
          <div className="col-md-3">
            <input
              type="date"
              value={toDate}
              onChange={(e) => {
                setToDate(e.target.value);
              }}
            />
            <input
              type="date"
              value={fromDate}
              onChange={(e) => {
                setFromDate(e.target.value);
              }}
            /> */}
        {/* <RangePicker format="DD-MM-YYYY" onChange={fillterByDate} /> */}
        {/* </div> */}

        {/* </form> */}

        <div className="col-md-5">
          <input
            type="text"
            classname="form-control"
            placeholder="Search Rooms"
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <select
            className="form-control"
            value={type}
            onChange={(event) => {
              filterByType(event.target.value);
              setType(event.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="dulux">Delux</option>
            <option value="non-dulux">Non-Dulux</option>
          </select>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          // rooms
          //   ?.filter((value) => {
          //     if (searchkey === "") {
          //       return value;
          //     } else if (
          //       value.name.toLowerCase().includes(searchkey.toLowerCase())
          //     ) {
          //       return value;
          //     }
          //   })
          rooms.map((room) => {
            // <div item key={rooms?.id} xs={12} sm={6} md={4} lg={3}>
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} />
              </div>
            );
            {
              /* </div>; */
            }
          })
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
