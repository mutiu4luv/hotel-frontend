import axios from 'axios'
import React, { useEffect, useState } from 'react'

function HomeScreen() {
    const [rooms, setRooms] = useState([])
    const [loading, setLoading] =useState(true)
    const [error, setError] =useState(true)
   


  useEffect(() => {
    const fetchHotels = async () => {

      const { data } = await axios.get("http://localhost:5000/api/rooms/getallrooms")
        setRooms(data)
        setLoading(false)
        setError(false)

           console.log("data", data);
    };

    fetchHotels();
  }, []);


  return (
    <div>
   {loading ? (<h1>loading</h1>) : error ? (<h1>error</h1>) : (<h1>rooms</h1>)}
    </div>
  )
}

export default HomeScreen

