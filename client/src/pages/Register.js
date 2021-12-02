import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import Loader from "../components/Load";
import Error from "../components/Error";
import Success from "../components/Success"

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [success, setSuccess] = useState();


  async function register() {
    if (password == confirmpassword) {
      const user = {
        name,
        email,
        password,
        confirmpassword,
      };

      try {
        setLoading(true)
        const response = await axios.post('/api/users/register', user).data
        setLoading(false)
        setSuccess(true)

        setName('')
        setEmail('')
        setPassword('')
        setConfirmpassword('')
      } catch(err) {
        console.log(err)
        setLoading(false)
        setError(true)
      }
    
    } else {
      alert("Password does not match");
    }
  }
  return (
    <Container>
      {loading && (<Loader />)}
      {error && (<Error/>)}
      
      <Row className="row justify-content-center mt-5">
        <Col md={5}>
          <Col className="box-shadow">
          {success && (<Success message='Registration Successful' />)}
            <h1>Register</h1>
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="confirm-password"
              value={confirmpassword}
              onChange={(e) => {
                setConfirmpassword(e.target.value);
              }}
            />
            <Button className="mt-3" variant="primary" onClick={register}>
              REGISTER
            </Button>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
