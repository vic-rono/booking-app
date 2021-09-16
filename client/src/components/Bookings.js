import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col, Button } from "react-bootstrap";
import Loader from "./Load";
import Error from "../components/Error";
import swal from "sweetalert";
import { Tag } from 'antd'


const Bookings = () => {
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  useEffect(async () => {
    try {
      setLoading(true);
      const data = await (
        await axios.post("/api/booking/getbookingsbyuserid", {
          userid: user._id,
        })
      ).data;
      console.log(data);
      setBookings(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(error);
    }
  }, []);

  async function cancelBooking(bookingid, roomid) {
    try {
      setLoading(true);
      const response = await (
        await axios.post("/api/booking/cancelbooking", { bookingid, roomid })
      ).data;
      console.log(response);
      setLoading(false);
      swal("Success", "Cancelled Booking", "success").then((response) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal("Error", "Something Went wrong", "error");
    }
  }

  return (
    <Container>
      <Row>
        <Col md={6}>
          {loading && <Loader />}
          {bookings &&
            bookings.map((booking) => {
              return (
                <div className="box-shadow" style={{ textAlign: "left" }}>
                  <p>
                    <b>{booking.room}</b>
                  </p>
                  <p>
                    <b>BookingId</b> : {booking._id}
                  </p>
                  <p>
                    <b>CheckIn </b>: {booking.fromDate}
                  </p>
                  <p>
                    <b>Check Out</b> : {booking.toDate}
                  </p>
                  <p>
                    <b>Amount</b>: {booking.totalamount}
                  </p>
                  <p>
                    <b>Status</b>:{" "}
                    {booking.status == 'cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="green">CONFIRMED</Tag>)}
                  </p>
                  {booking.status !== "cancelled" && (
                    <div className="text-right">
                      <Button
                        variant="primary"
                        onClick={() =>
                          cancelBooking(booking._id, booking.roomid)
                        }
                      >
                        CANCEL BOOKING
                      </Button>
                    </div>
                  )}
                </div>
              );
            })}
        </Col>
      </Row>
    </Container>
  );
};

export default Bookings;
