import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Load";
import Error from "../components/Error";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  async function Login() {
    const user = {
      name,
      password,
    };
    try {
      setLoading(true);
      const response = (await axios.post("/api/users/login", user)).data;
      setLoading(false);
      localStorage.setItem("currentUser", JSON.stringify(response));
      window.location.href = "/";
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(true);
    }
    console.log(user);
  }

  return (
    <Container>
      {loading && <Loader />}
      <Row className="row justify-content-center mt-5">
        <Col md={5}>
          {error && <Error message="Invalid Credentials" />}
          <Col className="box-shadow">
            <h1>Login</h1>
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button className="mt-3" variant="primary" onClick={Login}>
              LOGIN
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
