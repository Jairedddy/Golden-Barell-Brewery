import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as { _getIconUrl?: unknown })._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  });
}

interface InteractiveMapProps {
  address?: string;
  coordinates?: [number, number]; // [latitude, longitude]
  zoom?: number;
  height?: string;
  className?: string;
}

// Component to handle map view updates
const MapViewUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);
  
  return null;
};

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  address = '123 Brewery Street, Portland, OR 97201',
  coordinates = [45.5152, -122.6784], // Default Portland, OR coordinates
  zoom = 15,
  height = '200px',
  className = '',
}) => {
  const mapRef = useRef<L.Map | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Ensure component only renders on client side (for SSR compatibility)
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Custom marker icon with brewery theme
  const breweryIcon = isClient ? L.divIcon({
    className: 'custom-brewery-marker',
    html: `
      <div style="
        background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
        width: 40px;
        height: 40px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid #ffffff;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
      ">
        <div style="
          transform: rotate(45deg);
          color: white;
          font-size: 18px;
          font-weight: bold;
        ">🍺</div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }) : undefined;

  const handleMapReady = () => {
    // Map is ready
  };

  const handleGetDirections = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`, '_blank');
  };

  if (!isClient) {
    return (
      <div
        className={`relative overflow-hidden rounded-lg bg-muted flex items-center justify-center ${className}`}
        style={{ height }}
      >
        <div className="text-center text-muted-foreground">
          <MapPin className="h-12 w-12 mx-auto mb-4 opacity-50 animate-pulse" />
          <p className="text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={`relative overflow-hidden rounded-lg ${className}`}
      style={{ height }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <MapContainer
        center={coordinates}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {breweryIcon && (
          <Marker position={coordinates} icon={breweryIcon}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-foreground mb-2">Golden Barrel Brewery</h3>
              <p className="text-sm text-muted-foreground mb-3">{address}</p>
              <button
                onClick={handleGetDirections}
                className="text-xs bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90 transition-colors"
              >
                Get Directions
              </button>
            </div>
          </Popup>
        </Marker>
        )}
        <MapViewUpdater center={coordinates} zoom={zoom} />
      </MapContainer>

      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 z-[1000] pointer-events-none">
        <motion.div
          className="bg-background/95 backdrop-blur-sm rounded-lg p-3 shadow-lg pointer-events-auto"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className="flex items-center space-x-2">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-semibold text-foreground">Golden Barrel</p>
              <p className="text-xs text-muted-foreground">{address}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Get Directions Button */}
      <div className="absolute bottom-4 right-4 z-[1000] pointer-events-none">
        <motion.button
          onClick={handleGetDirections}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg hover:bg-primary/90 transition-colors pointer-events-auto flex items-center space-x-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <MapPin className="h-4 w-4" />
          <span className="text-sm font-medium">Get Directions</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default InteractiveMap;

