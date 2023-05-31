import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Card, Carousel } from "react-bootstrap";
import home from "../images/home.jpg";
import room1 from "../images/room1.jpeg";
import room2 from "../images/room2.jpeg";
import Loader from "../components/Loader";
import { getRoom } from "../Data/DataApi";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import LandingScreenTwo from "./LandingScreenTwo";

// import room2 from "../../public/assests/room2.jpeg";

const LandingPageScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      const { data } = await axios.get(getRoom);
      setRooms(data.rooms);

      setLoading(false);
      setError(false);

      console.log("data", data);
    };
    fetchHotels();
  }, []);

  return (
    <div>
      <div>
        <img src={home} alt="alt" className="img" />
      </div>
      <div
        className="display-flex row"
        style={{ display: "flex ", paddingTop: "40px" }}
      >
        <div className=" row  first  ">
          <img
            src={room1}
            alt="alt"
            className="smallimage"
            style={{ paddingLeft: "80px" }}
          />
          {/* <img src={room2} alt="alt" className="smallimg" /> */}
        </div>
        <div className="col-md-5 ">
          <div className="  font">
            Welcome and Relax at Mutiu Hotel and Suites
          </div>
          <h1 style={{ textAlign: "center" }}>
            Dedicated To Your Peace Of Mind
          </h1>
          <div style={{ textAlign: "center", paddingRight: "20px" }}>
            mutiu Hotel and Suites is one of the best Hotels in town, your home
            away from home. It is also a business and leisure hotel. Our Hotel
            is situated in the city center of Owerri, a few kilometers away from
            the Shopping mall, Clubs, Restaurants and other tourist center. Stay
            at our hotel and enjoy special services that are affordable and
            carefully reserved for our guests. We will help you experience the
            very best parts of our town and show you some hidden gems.
          </div>
        </div>
      </div>
      <div>
        <LandingScreenTwo />
      </div>
      <div className="bs">
        <div className="font"> Featured Rooms</div>
        <h1 style={{ textAlign: "center" }}>
          Every room type has many rooms. Anyone can send booking requrest from
          this site.
        </h1>
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : (
          // rooms.map((room) => {
          //   return (
          //     <Carousel
          //       style={{
          //         display: "flex",
          //         flexWrap: "wrap",
          //         float: "right",
          //       }}
          //     >
          //       {/* <Carousel.Item> */}
          //       <div item key={rooms?.id} xs={12} sm={6} md={4} lg={3}>
          //         <div
          //           style={{
          //             display: "flex",
          //             flexWrap: "wrap",
          //             float: "left",
          //           }}
          //         >
          //           <Card style={{ width: "18rem", margin: "50px" }}>
          //             <Card.Img variant="top" src={room?.imageurls[0]} />
          //             <Card.Body>
          //               <Card.Title>Card Title</Card.Title>
          //               <Card.Text>
          //                 Some quick example text to build on the card title and
          //                 make up the bulk of the card's content.
          //               </Card.Text>
          //               <Button variant="primary">Go somewhere</Button>
          //             </Card.Body>
          //           </Card>
          //         </div>
          //       </div>
          //       {/* </Carousel.Item> */}
          //     </Carousel>
          //   );
          //   {
          //     /* </div>; */
          //   }
          // })
          rooms.map((room) => (
            <Grid item key={room.id} xs={12} sm={6} md={4} lg={3}>
              {/* <Product
                product={product}
                onAddToCart={onAddToCart}
                onSearch={handleChange}
              /> */}

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  float: "left",
                }}
              >
                <Card style={{ width: "18rem", margin: "50px" }}>
                  <Card.Img variant="top" src={room?.imageurls[0]} />
                  <Card.Body>
                    <Card.Title>type: {room?.type}</Card.Title>
                    <Card.Text>Price : N{room?.rentperday}</Card.Text>

                    <Link to={`/booking/${room._id} `}>
                      <Button variant="primary">Book Now</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </div>
            </Grid>
          ))
        )}
      </div>
    </div>
  );
};

export default LandingPageScreen;
