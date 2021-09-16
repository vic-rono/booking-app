import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import AdminBookings from '../components/AdminBookings'
import AdminRooms from '../components/AdminRooms'
import AdminUsers from "../components/AdminUsers";
import AddRoom from "../components/AddRoom";


const Admin = () => {

  useEffect(() => {
    if(!JSON.parse(localStorage.getItem("currentUser")).isAdmin){
    window.location.href='/'
    }
  }, [])
  const [key, setKey] = useState("Bookings");

  return (
    <div className="mt-3 mr-4">
      <h2>Admin Panel</h2>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <h1>Admin Panel</h1>
        <Tab eventKey="bookings" title="Bookings">
          <h1><AdminBookings /></h1>
        </Tab>
        <Tab eventKey="rooms" title="Rooms">
          <h1><AdminRooms /></h1>
        </Tab>
        <Tab eventKey="add room" title="Add Room">
          <h1><AddRoom /></h1>
        </Tab>
        <Tab eventKey="users" title="Users">
          <h1><AdminUsers /> </h1>
        </Tab>
      </Tabs>
    </div>
  );
};

export default Admin