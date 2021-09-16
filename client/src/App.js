
import './App.css';
import Naavbar from './components/Navbar';
import {BrowserRouter, Route } from 'react-router-dom'
import Home from './pages/Home';
import Booking from './pages/Booking';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Admin from './pages/Admin';
import LandingPage from './pages/LandingPage';




function App() {
  return (
    <div className="App">
      <Naavbar />
      <BrowserRouter>
      <Route path="/home" exact component={Home} />
      <Route path="/book/:roomid/:fromDate/:toDate" exact component={Booking} />
      <Route path="/register" exact component={Register} />
      <Route path="/login" exact component={Login} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/admin" exact component={Admin} />
      <Route path="/"  exact component={LandingPage} />
     </BrowserRouter>
    </div>
  );
}

export default App;
