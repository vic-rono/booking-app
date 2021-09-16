import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Load from "../components/Load";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await (await axios.get("/api/booking/getallbookings")).data;
      setBookings(data);
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
          <h1>Bookings</h1>
          {loading && <Load />}
          <table className="table table-bordered table-blue">
            <thead>
              <tr>
                <th>Booking ID</th>
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
                      <td>{booking.fromDate}</td>
                      <td>{booking.toDate}</td>
                      <td>{booking.status}</td>
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

export default AdminBookings;
