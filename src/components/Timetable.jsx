import React from 'react';
import { useNavigate } from 'react-router-dom';

const Timetable = () => {
    const navigate = useNavigate();

    // Hardcoded schedule for now
    const schedule = [
        { route: 'Main Gate -> Library', time: '08:00 AM', type: 'Bus' },
        { route: 'Library -> Hostels', time: '08:15 AM', type: 'Buggy' },
        { route: 'Main Gate -> Departments', time: '08:30 AM', type: 'Bus' },
        { route: 'Hostels -> Library', time: '08:45 AM', type: 'Buggy' },
        { route: 'Main Gate -> Library', time: '09:00 AM', type: 'Bus' },
        // Add more as needed
    ];

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <button className="btn" onClick={() => navigate('/')} style={{ marginBottom: '20px' }}>
                ← Back to Map
            </button>

            <h2>Bus & Buggy Schedule</h2>

            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f2f2f2', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Route</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Time</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {schedule.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.route}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>{item.time}</td>
                            <td style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                {item.type === 'Bus' ? '🚌' : '🛺'} {item.type}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Timetable;
