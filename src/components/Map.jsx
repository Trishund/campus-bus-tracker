import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ref, onValue } from 'firebase/database';
import { db } from '../firebase';
import { campusData } from '../data/campusData';
import { busIcon, buggyIcon, stopIcon } from '../utils/icons';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';

// Component to restrict map view
const MapBounds = ({ bounds }) => {
    const map = useMap();
    useEffect(() => {
        if (bounds) {
            const southWest = L.latLng(bounds.southWest.lat, bounds.southWest.lng);
            const northEast = L.latLng(bounds.northEast.lat, bounds.northEast.lng);
            const mapBounds = L.latLngBounds(southWest, northEast);

            map.setMaxBounds(mapBounds);
            map.fitBounds(mapBounds);
            map.setMinZoom(15);
        }
    }, [bounds, map]);
    return null;
};

const MapView = () => {
    const [vehicles, setVehicles] = useState({});
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const vehiclesRef = ref(db, 'vehicles');
        const unsubscribe = onValue(vehiclesRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setVehicles(data);
            } else {
                setVehicles({});
            }
        });

        return () => unsubscribe();
    }, []);

    // Calculate center from bounds
    const centerLat = (campusData.mapBounds.northEast.lat + campusData.mapBounds.southWest.lat) / 2;
    const centerLng = (campusData.mapBounds.northEast.lng + campusData.mapBounds.southWest.lng) / 2;

    return (
        <div style={{ height: '100vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column' }}>

            {/* Header */}
            <div className="app-header">
                <div className="logo-section">
                    <img src="/logo.jpg" alt="Logo" className="app-logo" />
                    <h1 className="app-title">Pondiuni bus tracker</h1>
                </div>
                <button className="menu-btn" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    ☰
                </button>
            </div>

            {/* Menu Overlay */}
            {isMenuOpen && (
                <div className="menu-overlay">
                    <div className="menu-content">
                        <button className="close-btn" onClick={() => setIsMenuOpen(false)}>×</button>

                        <h3>Menu</h3>
                        <button className="menu-item" onClick={() => navigate('/timetable')}>
                            📅 Timetable
                        </button>
                        <button className="menu-item" onClick={() => navigate('/about')}>
                            ℹ️ About
                        </button>

                        <hr />

                        <h3>Legend</h3>
                        <div className="legend-item">
                            <span style={{ fontSize: '24px' }}>🚌</span> <span>Bus (Red)</span>
                        </div>
                        <div className="legend-item">
                            <span style={{ fontSize: '24px' }}>🛺</span> <span>Buggy (Green)</span>
                        </div>
                    </div>
                </div>
            )}

            <div style={{ flex: 1, position: 'relative' }}>
                <MapContainer
                    center={[centerLat, centerLng]}
                    zoom={16}
                    style={{ height: '100%', width: '100%' }}
                    zoomControl={false}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    <MapBounds bounds={campusData.mapBounds} />

                    {/* Static Stops */}
                    {campusData.stops.map((stop, index) => (
                        <Marker
                            key={index}
                            position={[stop.lat, stop.lng]}
                            icon={stopIcon}
                        >
                            <Popup>{stop.name}</Popup>
                        </Marker>
                    ))}

                    {/* Live Vehicles */}
                    {Object.entries(vehicles).map(([id, vehicle]) => {
                        // Only show active vehicles updated in the last 5 minutes
                        const isFresh = (Date.now() - vehicle.lastUpdated) < 5 * 60 * 1000;
                        if (!vehicle.active || !isFresh) return null;

                        return (
                            <Marker
                                key={id}
                                position={[vehicle.lat, vehicle.lng]}
                                icon={vehicle.type === 'BUGGY' ? buggyIcon : busIcon}
                            >
                                <Popup>
                                    <strong>{vehicle.type === 'BUGGY' ? 'Buggy' : 'Bus'}</strong>
                                    <br />
                                    Last seen: {new Date(vehicle.lastUpdated).toLocaleTimeString()}
                                </Popup>
                            </Marker>
                        );
                    })}
                </MapContainer>
            </div>
        </div>
    );
};

export default MapView;
