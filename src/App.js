import React from 'react';
import { Link, BrowserRouter, Routes, Route} from "react-router-dom";
import Login from './pages/login.js';
import Signup from './pages/signup.js';
import Home from './pages/home.js';
import Order from './pages/order.js';
import Profile from './pages/profile.js';
import Stations from './pages/stations.js';

function App(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/home" element={<Home />} />
                <Route path="/order" element={<Order />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/stations" element={<Stations />} />
            </Routes>
      </BrowserRouter>
    );
}

export default App;