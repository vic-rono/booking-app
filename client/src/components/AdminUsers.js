import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import Loader from "./Load";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await (await axios.get("/api/users/getallusers")).data;
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError(error);
    }
  }, []);

  return (
    <Row>
      <Col md={12}>
        <h1>Users</h1>
        {loading && <Loader />}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>User Id</th>
              <th>Name</th>
              <th>E-mail</th>
              <th>Is Admin</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => {
                return (
                  <tr>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin ? "YES" : "NO"}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </Col>
    </Row>
  );
};

export default AdminUsers;
