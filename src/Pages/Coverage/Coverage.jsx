import { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { FaSearchLocation } from "react-icons/fa";
import "leaflet/dist/leaflet.css";

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

// Custom component to move map dynamically
const MapFlyTo = ({ lat, lng, zoom }) => {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], zoom, { duration: 1.5 });
    }
  }, [lat, lng, zoom, map]);
  return null;
};

const Coverage = () => {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredDistrict, setFilteredDistrict] = useState(null);
  const mapRef = useRef();

  // Fetch coverage data
  useEffect(() => {
    fetch("/coverageData.json")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  // Handle search
  const handleSearch = () => {
    const match = data.find(
      (item) => item.district.toLowerCase() === search.toLowerCase()
    );
    if (match) {
      setFilteredDistrict(match);
    } else {
      setFilteredDistrict(null);
      alert("District not found!");
    }
  };

  // Map settings
  const defaultCenter = [23.685, 90.3563];
  const zoom = filteredDistrict ? 9 : 7; // 🔹 slightly zoomed closer
  const mapHeight = "450px"; // 🔹 smaller map

  return (
    <div className="p-6 space-y-6">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center text-primary">
        Our Service of 64 Districts in Bangladesh
      </h1>

      {/* Search */}
      <div className="flex justify-center mt-6">
        <div className="join w-full max-w-md">
          <input
            type="text"
            placeholder="Search district..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered join-item w-full"
          />
          <button onClick={handleSearch} className="btn btn-primary join-item">
            <FaSearchLocation size={18} />
          </button>
        </div>
      </div>

      {/* Map Section */}
      <div
        className="w-full mt-8 rounded-lg overflow-hidden shadow-lg"
        style={{ height: mapHeight }}
      >
        <MapContainer
          ref={mapRef}
          center={
            filteredDistrict
              ? [filteredDistrict.latitude, filteredDistrict.longitude]
              : defaultCenter
          }
          zoom={zoom}
          scrollWheelZoom={true}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {/* Move map dynamically */}
          {filteredDistrict && (
            <MapFlyTo
              lat={filteredDistrict.latitude}
              lng={filteredDistrict.longitude}
              zoom={12}
            />
          )}

          {data.map((item, index) => (
            <Marker key={index} position={[item.latitude, item.longitude]}>
              <Popup>
                <div>
                  <h3 className="font-bold">{item.district}</h3>
                  <p>{item.region}</p>
                  <p className="text-sm">
                    Areas: {item.covered_area.join(", ")}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
