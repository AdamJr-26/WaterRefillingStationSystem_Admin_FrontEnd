import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { useMapEvents } from "react-leaflet/hooks";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";

import { Icon } from "@iconify/react";

function Map({ formData }) {
  
  const center = {
    lat: "14.344800",
    lng: "121.00000",
  };
  const [position, setPosition] = useState(null);

  //   ============ internal component ========
  useEffect(() => {
    formData.geolocation = position;
  }, [position]);
  useEffect(() => {
    formData.geolocation = center;
  }, []);
  function DraggableMarker({ position, setPosition }) {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
      },
    });

    const markRef = useRef();
    const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markRef.current;
          if (marker != null) {
            setPosition(marker.getLatLng());
          }
        },
      }),
      []
    );
    return position === null ? null : (
      <Marker
        eventHandlers={eventHandlers}
        draggable={true}
        ref={markRef}
        position={position}
        zoom={80}
      >
        <Popup>
          <div>
            <div style={{display:"flex", alignItems:"center"}}>
              <p style={{ fontSize: 32 }}>
                <Icon icon="clarity:home-solid" />
              </p>
            </div>
            <div>
              <p>Latitude: {position.lat}</p>
              <p>Longitude: {position.lng}</p>
            </div>
          </div>
        </Popup>
      </Marker>
    );
  }
  return (
    <div className="leaflet-map-container map">
      <MapContainer
        style={{ height: "100%", width: "100%" }}
        center={center}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <DraggableMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
}

export default Map;
