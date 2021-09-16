import React, { useState, useEffect } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import { Button, Col, Container, Row } from "react-bootstrap";
import Loader from "../components/Load";
import Error from "../components/Error";
import moment from "moment";
import swal from "sweetalert";

const Booking = ({ match }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [room, setRoom] = useState();
  const [totalamount, setTotalAmount] = useState();

  const fromDate = moment(match.params.fromDate, "DD-MM-YYYY");
  const toDate = moment(match.params.toDate, "DD-MM-YYYY");

  const totalDays = moment.duration(toDate.diff(fromDate)).asDays() + 1;

  useEffect(async () => {
    if (!localStorage.getItem("currentUser")) {
      window.location.reload = "/login";
    }
    try {
      setLoading(true);
      const data = (
        await axios.post("/api/rooms/getroombyid", {
          roomid: match.params.roomid,
        })
      ).data;
      setTotalAmount(data.rentperday * totalDays);
      setRoom(data);
      setLoading(false);
    } catch (err) {
      setError(true);
      setLoading(false);
    }
  }, []);

  async function bookRoom() {
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalamount,
      totalDays,
    };
    try {
      const response = await axios.post(
        "/api/booking/bookroom",
        bookingDetails
      );
    } catch (err) {
      console.log(err);
    }
  }
  async function onToken(token) {
    console.log(token);
    const bookingDetails = {
      room,
      userid: JSON.parse(localStorage.getItem("currentUser"))._id,
      fromDate,
      toDate,
      totalamount,
      totalDays,
      token,
    };
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/booking/bookroom",
        bookingDetails
      );
      setLoading(false);
      swal("Success", "Booked Successfully", "success").then((response) => {
        window.location.href = "/bookings";
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      swal("Error!", "Something went wrong", "error");
    }
  }
  return (
    <Container className="m-5">
      {loading ? (
        <Loader />
      ) : room ? (
        <div>
          <Row className="justify-content-center mt-5 box-shadow">
            <Col md={6}>
              <h1 style={{ textAlign: "left" }}>{room.name}</h1>
              <img src={room.imageurls[0]} className="big-img" />
            </Col>

            <Col md={5} style={{ textAlign: "right" }}>
              <h1>Booking details</h1>
              <br />
              <p>
                Name :{JSON.parse(localStorage.getItem("currentUser")).name}
              </p>
              <p>From :{match.params.fromDate}</p>
              <p>To :{match.params.toDate}</p>
              <p>Guests :{room.maxcount} </p>
              <div>
                <h1>Amount</h1>
                <br />
                <p>Total days :{totalDays}</p>
                <p>Rent per day : {room.rentperday}</p>
                <p>Total Amount :{totalamount}</p>
              </div>
              <div style={{ float: "right" }}>
                <StripeCheckout
                  amount={totalamount * 100}
                  token={onToken}
                  stripeKey="pk_test_51IVEB6CCWmIObDCQSyJY3V8ktIKGOJ5mH39An1DHN3nMSEWFuuBvmZ2Pc3l7XDXj0Dc45GwxAXqdO6nzQ2hiHBiS00Vm66XZWS"
                >
                  <Button variant="primary">Pay Now{""}</Button>
                </StripeCheckout>
              </div>
            </Col>
          </Row>
        </div>
      ) : (
        <Error />
      )}
    </Container>
  );
};

export default Booking;
