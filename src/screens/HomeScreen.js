import axios from "axios";
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/rooms/getallrooms"
        // "https://jsonplaceholder.typicode.com/photos"
      );
      setRooms(data.rooms);
      setLoading(false);
      setError(false);

      console.log("data", data);
    };
    fetchHotels();
  }, []);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : rooms?.length > 1 ? (
          rooms?.map((room) => {
            return (
              <div className="col-md-9 mt-3">
                <Room room={room} />
              </div>
            );
          })
        ) : (
          <Error />
        )}
      </div>
    </div>
  );
}

export default HomeScreen;
