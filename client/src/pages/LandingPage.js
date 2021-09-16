import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import AOS from "aos";

AOS.init({
  duration: "3000",
});

function LandingPage() {
  return (
    <Row className="land">
      <Col md={12}>
        <Link to="/home">
          <h3 data-aos="fade-up" style={{ color: "white" }}>
            ITEN ROOMS
          </h3>
          <h1 data-aos="fade-down" style={{ color: "white" }} className="mt-2">
            Welcome Customer
          </h1>
          <Button variant="outline-light" className="mt-2">
            Get started
          </Button>
        </Link>
      </Col>
    </Row>
  );
}

export default LandingPage;
