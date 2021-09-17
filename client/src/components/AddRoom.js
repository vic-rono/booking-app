import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import swal from "sweetalert";
import Load from "../components/Load";

const AddRoom = () => {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState();
  const [rentperday, setRentPerDay] = useState();
  const [guests, setGuests] = useState();
  const [description, setDescription] = useState();
  const [phonenumber, setPhoneNumber] = useState();
  const [image, setImage] = useState();
  const [image2, setImage2] = useState();
  const [image3, setImage3] = useState();

  async function addRoom() {
    const newRoom = {
      name,
      rentperday,
      guests,
      description,
      phonenumber,
      imageurls: [image, image2, image3],
    };
    try {
      setLoading(true);
      const response = await (
        await axios.post("/api/rooms/addroom", newRoom)
      ).data;
      console.log(response);
      setLoading(false);
      swal("Success", "Room Added Successfully", "success").then((response) => {
        window.location.href = "/home";
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      swal("Error", "Something Went Wrong, Try Again", "success");
    }
  }

  return (
    <div>
      {loading && <Load />}
      <Row>
        <Col md={5}>
          <input
            type="text"
            className="form-control"
            placeholder="Room-Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Room-Rentperday"
            value={rentperday}
            onChange={(e) => {
              setRentPerDay(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Room-Guests"
            value={guests}
            onChange={(e) => {
              setGuests(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Room-Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Room-Phone Number"
            value={phonenumber}
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="image-1"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="image-2"
            value={image2}
            onChange={(e) => {
              setImage2(e.target.value);
            }}
          />
          <input
            type="text"
            className="form-control"
            placeholder="image-3"
            value={image3}
            onChange={(e) => {
              setImage3(e.target.value);
            }}
          />

          <div className="text-right">
            <Button variant="primary" className="mt-3" onClick={addRoom}>
              Add Room
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default AddRoom;
