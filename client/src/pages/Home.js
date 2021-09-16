import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Room from "../components/Room";
import Loader from "../components/Load";
import "antd/dist/antd.css";
import moment from "moment";
import { DatePicker, Space } from "antd";
const { RangePicker } = DatePicker;

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicaterooms, setDuplicateRooms] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(async () => {
    try {
      setLoading(true);
      const data = (await axios.get("/api/rooms/getallrooms")).data;
      setRooms(data);
      setDuplicateRooms(data);
      setLoading(false);
    } catch (err) {
      setError(true);
      console.log(err);
      setLoading(false);
    }
  }, []);

  function filterByDate(dates) {
    setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
    setToDate(moment(dates[1]).format("DD-MM-YYYY"));

    let tempRooms = [];
    let available = false;
    for (const room of duplicaterooms) {
      if (room.currentbookings.length > 0) {
        for (const booking of room.currentbookings) {
          if (
            !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            ) &&
            !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
              booking.fromDate,
              booking.toDate
            )
          ) {
            if (
              moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
              moment(dates[1]).format("DD-MM-YYYY") !== booking.Date
            ) {
              available = true;
            }
          }
        }
      }
      if (available == true || room.currentbookings.length == 0) {
        tempRooms.push(room);
      }
      setRooms(tempRooms);
    }
  }
  function filterBySearch() {
    const searchRooms = duplicaterooms.filter((room) =>
      room.name.toLowerCase().includes(search.toLowerCase())
    );
    setRooms(searchRooms);
  }

  return (
    <Container>
      <Row className="mt-5">
        <Col md={3}>
          <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
        </Col>
        <Col md={5}>
          <input
            type="text"
            className="form-control mt-1 float-right"
            placeholder="search rooms"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            onKeyUp={filterBySearch}
          />
        </Col>
      </Row>
      <Row mt={5} className="justify-content-center">
        {loading ? (
          <Loader />
        ) : (
          rooms.map((room) => {
            return (
              <Col md={9} className="mt-2">
                <Room room={room} fromDate={fromDate} toDate={toDate} />
              </Col>
            );
          })
        )}
      </Row>
    </Container>
  );
};

export default Home;
