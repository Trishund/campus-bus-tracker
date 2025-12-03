import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MapView from './components/Map';
import DriverApp from './components/DriverApp';
import Timetable from './components/Timetable';
import About from './components/About';
import './App.css';

function App() {
    return (
        <Router>
            <div className="app-container">
                <Routes>
                    <Route path="/" element={<MapView />} />
                    <Route path="/driver" element={<DriverApp />} />
                    <Route path="/timetable" element={<Timetable />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
