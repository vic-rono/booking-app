import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Modal, Carousel, Button, Col, Row } from "react-bootstrap";

const Room = ({ room, fromDate, toDate }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row className="box-shadow">
      <Col md={4}>
        <img src={room.imageurls[0]} className="small-img" />
      </Col>
      <Col md={7} style={{ textAlign: "left" }}>
        <h1>{room.name}</h1>
        <p>Max Count: {room.maxcount}</p>
        <p>Phone Number: {room.phonenumber}</p>
       

        <div style={{ float: "right" }}>
          {fromDate && toDate && (
            <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
              <Button variant="outline-primary m-2">Book Now</Button>
            </Link>
          )}

          <Button variant="outline-primary" onClick={handleShow}>
            View Details
          </Button>
        </div>
      </Col>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={true}
        size="lg"
      >
        <Modal.Header closeLabel>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel prevLabel="" nextLabel="">
            {room.imageurls.map((url) => {
              return (
                <Carousel.Item>
                  <img className="d-block w-100 big-img" src={url} />
                </Carousel.Item>
              );
            })}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Row>
  );
};

export default Room;
