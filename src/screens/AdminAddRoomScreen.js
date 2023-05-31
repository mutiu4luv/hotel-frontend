import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Loader from "../components/Loader";
const AdminAddRoomScreen = () => {
  const [name, setName] = useState("");
  const [rentperday, setRentPerDay] = useState();
  const [maxcount, setMaxCount] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhonenumber] = useState();
  const [type, setType] = useState();
  const [imageurl1, setImageurl1] = useState();
  const [imageurl2, setImageurl2] = useState();
  const [imageurl3, setImageurl3] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const navigate = useNavigate();

  async function addroom() {
    const newroom = {
      name,
      rentperday,
      maxcount,
      description,
      phonenumber,
      type,
      imageurls: [imageurl1, imageurl2, imageurl3],
    };

    try {
      setLoading(true);

      const data = await (
        await axios.post("http://localhost:5000/api/rooms/addrooms", newroom)
      ).console.log("result", data);
      setLoading(false);
      Swal.fire(
        "congratulations",
        " Your room have been created",
        "success"
      ).then((result) => {
        navigate("/home");

        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      Swal.fire("ooops", "something went wrong", "error");
    }
  }

  return (
    <div className="row">
      <div className="col-md-5">
        {loading && <Loader />}

        <input
          type="text"
          className="form-control"
          placeholder="Room Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Rent Per Day"
          value={rentperday}
          onChange={(e) => {
            setRentPerDay(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Max Count"
          value={maxcount}
          onChange={(e) => {
            setMaxCount(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder=" Phone Number"
          value={phonenumber}
          onChange={(e) => {
            setPhonenumber(e.target.value);
          }}
        />
      </div>
      <div className="col-md-5">
        <input
          type="text"
          className="form-control"
          placeholder="Type"
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image one "
          value={imageurl1}
          onChange={(e) => {
            setImageurl1(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image two"
          value={imageurl2}
          onChange={(e) => {
            setImageurl2(e.target.value);
          }}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Image Three"
          value={imageurl3}
          onChange={(e) => {
            setImageurl3(e.target.value);
          }}
        />
        <div className="text-right">
          <button className="btn btn-primary mt-2" onClick={addroom}>
            {" "}
            Add Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAddRoomScreen;
