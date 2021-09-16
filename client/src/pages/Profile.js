import React, { useState, useEffect } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Bookings from "../components/Bookings";

const Profile = () => {
  const [key, setKey] = useState("profile");

  const user = JSON.parse(localStorage.getItem("currentUser"))

  useEffect(() => {
    if(!user){
        window.location.href='/login'
    }
  }, [])

  return (
    <div className="mt-3">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="profile" title="Profile">
          <h1>My Profile</h1>
          <br />
          <h1>Name: {user.name}</h1>
          <h1>Email: {user.email}</h1>
          <h1>isAdmin: {user.isAdmin ? 'YES' : 'NO'}</h1>
        </Tab>
        <Tab eventKey="bookings" title="Bookings">
          <Bookings />
        </Tab>
      </Tabs>
    </div>
  );
};

export default Profile;





