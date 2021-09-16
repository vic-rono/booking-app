import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Loader from "./Load";


const AdminRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await (
        await axios.get("/api/rooms/getallrooms")
      ).data;
      setRooms(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(error);
    }
  }, []);
  return (
    <div>
      <Row>
        <Col md={10}>
          <h1>Rooms</h1>
          {loading && <Loader />}
          <table className="table table-bordered table-blue">
            <thead>
              <tr>
                <th>Room ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Guests</th>
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
                      <td>{room.rentperday}</td>
                      <td>{room.guests}</td>
                      <td>{room.phonenumber}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default AdminRooms;
