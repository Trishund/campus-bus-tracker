import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <button className="btn" onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
                ← Back to Map
            </button>

            <h2>About Campus Tracker</h2>

            <div style={{ textAlign: 'left', lineHeight: '1.6' }}>
                <p>
                    This is a real-time tracking system for the university's transportation network.
                    It helps students and staff locate buses and buggies within the campus.
                </p>

                <h3>Features</h3>
                <ul>
                    <li>Real-time GPS tracking</li>
                    <li>Live map with stops</li>
                    <li>Bus & Buggy differentiation</li>
                    <li>Works on all devices (PWA)</li>
                </ul>

                <h3>Contact</h3>
                <p>
                    <strong>University Transport Office</strong><br />
                    Email: transport@university.edu<br />
                    Phone: +91 123 456 7890
                </p>

                <p>
                    <strong>Developer Info</strong><br />
                    Developed by: [Your Name]<br />
                    Version: 1.0.0
                </p>
            </div>
        </div>
    );
};

export default About;
