import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const pickupIcon = L.icon({
  ...defaultIcon.options,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png'
});

const dropoffIcon = L.icon({
  ...defaultIcon.options,
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconRetinaUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png'
});

export interface MapLocation {
  id: number;
  lat: number;
  lng: number;
  name: string;
  type: 'pickup' | 'dropoff';
  status: 'pending' | 'in-progress' | 'completed';
  [key: string]: any; // Allow additional properties
}

interface DeliveryMapProps {
  locations: MapLocation[];
  onLocationClick?: (location: MapLocation) => void;
  selectedLocationId?: number | null;
  routePath?: Array<[number, number]>;
  currentLocation?: { lat: number; lng: number } | null;
}

const DeliveryMap: React.FC<DeliveryMapProps> = ({
  locations = [],
  onLocationClick,
  selectedLocationId,
  routePath = [],
  currentLocation
}) => {
  // Default to New York City if no locations
  const defaultCenter: [number, number] = [40.7128, -74.0060];
  
  // Calculate bounds to fit all markers
  const calculateBounds = () => {
    if (locations.length === 0) return [defaultCenter, defaultCenter] as [[number, number], [number, number]];
    
    let lats = locations.map(loc => loc.lat);
    let lngs = locations.map(loc => loc.lng);
    
    if (currentLocation) {
      lats.push(currentLocation.lat);
      lngs.push(currentLocation.lng);
    }
    
    return [
      [Math.min(...lats) - 0.02, Math.min(...lngs) - 0.02],
      [Math.max(...lats) + 0.02, Math.max(...lngs) + 0.02]
    ] as [[number, number], [number, number]];
  };

  // Generate a random route path if none provided
  const generateRoutePath = () => {
    if (routePath.length > 0) return routePath;
    
    const path: Array<[number, number]> = [];
    if (currentLocation) {
      path.push([currentLocation.lat, currentLocation.lng]);
    }
    
    locations.forEach(loc => {
      path.push([loc.lat, loc.lng]);
    });
    
    return path;
  };

  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden">
      <MapContainer
        center={defaultCenter}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
        bounds={calculateBounds()}
        boundsOptions={{ padding: [50, 50] }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        {/* Current Location Marker */}
        {currentLocation && (
          <Marker 
            position={[currentLocation.lat, currentLocation.lng]} 
            icon={L.divIcon({
              className: 'current-location-marker',
              html: `<div class="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>`,
              iconSize: [16, 16],
              iconAnchor: [8, 8]
            })}
          >
            <Popup>Your current location</Popup>
          </Marker>
        )}
        
        {/* Location Markers */}
        {locations.map((location) => {
          const icon = location.type === 'pickup' ? pickupIcon : dropoffIcon;
          
          return (
            <Marker
              key={location.id}
              position={[location.lat, location.lng]}
              icon={icon}
              eventHandlers={{
                click: () => onLocationClick && onLocationClick(location),
              }}
            >
              <Popup>
                <div className="font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`inline-block w-2 h-2 rounded-full ${
                      location.status === 'completed' ? 'bg-green-500' : 
                      location.status === 'in-progress' ? 'bg-blue-500' : 'bg-yellow-500'
                    }`}></span>
                    <span className="capitalize">{location.status.replace('-', ' ')}</span>
                  </div>
                  <div className="mt-1 text-sm text-gray-600">
                    {location.type === 'pickup' ? '📦 Pickup' : '🚚 Drop-off'}
                  </div>
                  <div className="text-sm">{location.name}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {/* Route Path */}
        {generateRoutePath().length > 1 && (
          <Polyline
            positions={generateRoutePath()}
            color="#3b82f6"
            weight={4}
            opacity={0.8}
            dashArray="5, 5"
          />
        )}
      </MapContainer>
      
      <style>{`
        .leaflet-container {
          background-color: #f8fafc;
        }
        .leaflet-popup-content-wrapper {
          border-radius: 0.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .leaflet-popup-content {
          margin: 0.5rem;
        }
        .leaflet-popup-tip {
          background: white;
        }
        .current-location-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  );
};

export default DeliveryMap;
