import React, { useState, useEffect, useRef } from 'react';
import { ref, update, onDisconnect } from 'firebase/database';
import { db } from '../firebase';

const DriverApp = () => {
    const [code, setCode] = useState('');
    const [isTracking, setIsTracking] = useState(false);
    const [status, setStatus] = useState('Enter Code to Start');
    const [vehicleType, setVehicleType] = useState('BUS'); // Default to BUS
    const watchIdRef = useRef(null);

    // Hardcoded codes for simplicity, or just allow any code
    // In a real app, fetch this from DB
    const validCodes = ['BUS01', 'BUS02', 'BUGGY01', 'BUGGY02'];

    const startTracking = () => {
        if (!code) {
            alert('Please enter a vehicle code');
            return;
        }

        if (!navigator.geolocation) {
            setStatus('Geolocation is not supported by your browser');
            return;
        }

        setStatus('Requesting permissions...');

        const id = navigator.geolocation.watchPosition(
            (position) => {
                const { latitude, longitude, accuracy, heading, speed } = position.coords;

                setStatus(`Tracking Active. Accuracy: ${Math.round(accuracy)}m`);

                // Update Live Vehicle Node
                const vehicleRef = ref(db, `vehicles/${code}`);
                const updates = {
                    lat: latitude,
                    lng: longitude,
                    lastUpdated: Date.now(),
                    heading: heading || 0,
                    speed: speed || 0,
                    type: vehicleType,
                    active: true
                };

                update(vehicleRef, updates);

                // Update History Node for ML
                // Format: history/YYYY-MM-DD/VEHICLE_ID/TIMESTAMP
                const dateStr = new Date().toISOString().split('T')[0];
                const historyRef = ref(db, `history/${dateStr}/${code}/${Date.now()}`);
                update(historyRef, {
                    lat: latitude,
                    lng: longitude,
                    accuracy: accuracy,
                    speed: speed,
                    timestamp: Date.now()
                });

                // Set disconnect handler to mark as inactive if app closes
                onDisconnect(vehicleRef).update({ active: false });

            },
            (error) => {
                setStatus(`Error: ${error.message}`);
                setIsTracking(false);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000,
                maximumAge: 0
            }
        );

        watchIdRef.current = id;
        setIsTracking(true);
    };

    const stopTracking = () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
            watchIdRef.current = null;
        }

        // Mark as inactive in DB
        if (code) {
            const vehicleRef = ref(db, `vehicles/${code}`);
            update(vehicleRef, { active: false });
        }

        setIsTracking(false);
        setStatus('Tracking Stopped');
    };

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
            }
        };
    }, []);

    return (
        <div style={{
            padding: '20px',
            maxWidth: '400px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            height: '100vh',
            justifyContent: 'center'
        }}>
            <h2>Driver Interface</h2>

            {!isTracking ? (
                <>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>Vehicle Type:</label>
                        <select
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            style={{ padding: '10px', fontSize: '16px' }}
                        >
                            <option value="BUS">Bus 🚌</option>
                            <option value="BUGGY">Buggy 🛺</option>
                        </select>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <label>Vehicle Code:</label>
                        <input
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value.toUpperCase())}
                            placeholder="e.g., BUS01"
                            style={{ padding: '10px', fontSize: '16px' }}
                        />
                    </div>

                    <button
                        className="btn btn-primary"
                        onClick={startTracking}
                        style={{ padding: '15px', fontSize: '18px' }}
                    >
                        START TRIP
                    </button>
                </>
            ) : (
                <>
                    <div style={{
                        padding: '20px',
                        backgroundColor: '#e8f5e9',
                        borderRadius: '10px',
                        border: '2px solid #4caf50'
                    }}>
                        <h3>Tracking Active</h3>
                        <p><strong>Vehicle:</strong> {code}</p>
                        <p><strong>Status:</strong> {status}</p>
                        <div className="pulsating-circle"></div>
                    </div>

                    <button
                        className="btn btn-danger"
                        onClick={stopTracking}
                        style={{ padding: '15px', fontSize: '18px' }}
                    >
                        STOP TRIP
                    </button>
                </>
            )}

            <p style={{ fontSize: '12px', color: '#666', marginTop: 'auto' }}>
                Keep this screen open while driving.
            </p>
        </div>
    );
};

export default DriverApp;
