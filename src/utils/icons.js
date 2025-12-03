import L from 'leaflet';

// Fix for default marker icon missing in React Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Custom Icons
// Using simple emoji-based divIcons for zero-dependency lightweight icons
// Or we can use SVGs. Let's use DivIcons with Emojis for maximum simplicity and performance.

export const busIcon = L.divIcon({
    html: '<div style="font-size: 30px; line-height: 1; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🚌</div>',
    className: 'custom-bus-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});

export const buggyIcon = L.divIcon({
    html: '<div style="font-size: 30px; line-height: 1; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">🛺</div>',
    className: 'custom-buggy-icon',
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -15]
});

export const stopIcon = L.divIcon({
    html: '<div style="background-color: #333; width: 10px; height: 10px; border-radius: 50%; border: 2px solid white; box-shadow: 0 0 4px rgba(0,0,0,0.5);"></div>',
    className: 'custom-stop-icon',
    iconSize: [14, 14],
    iconAnchor: [7, 7],
    popupAnchor: [0, -7]
});
