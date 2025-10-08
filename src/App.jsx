import { useState, useEffect } from "react";
import submitArrow from "./assets/images/icon-arrow.svg";
import mobileBg from "./assets/images/pattern-bg-mobile.png";
import desktopBg from "./assets/images/pattern-bg-desktop.png";
import "leaflet/dist/leaflet.css";
import MapSection from "./Map";

const mockData = {
  ip: "8.8.8.8",
  location: {
    city: "Mountain View",
    region: "California",
    country: "US",
    lat: 37.3861,
    lng: -122.0839,
    timezone: "-07:00",
  },
  isp: "Google LLC",
};

function App() {
  const [ipData, setIpData] = useState(null);
  const [ipInput, setIpInput] = useState("");
  const [error, setError] = useState("");
  const backgroundImage = window.innerWidth >= 640 ? desktopBg : mobileBg;

  useEffect(() => {
    fetchIPData(""); // Fetch user's own IP initially
  }, []);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 3000); // auto-hide after 3s
      return () => clearTimeout(timer);
    }
  }, [error]);

  const isValidIP = (ip) => {
    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/;
    const ipv6Regex = /^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    return ipv4Regex.test(ip) || ipv6Regex.test(ip);
  };

  const fetchIPData = async (ip) => {
    const apiKey = import.meta.env.VITE_IPIFY_API_KEY;
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`API Error: ${response.status}`);
      const data = await response.json();
      setIpData(data);
    } catch (error) {
      console.error("Failed to fetch IP data:", error);
      setIpData(mockData);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ipInput || !isValidIP(ipInput)) {
      setError("Please enter a valid IP address");
      return;
    }
    setError("");
    fetchIPData(ipInput);
  };

  return (
    <div className="bg-[#c8c8c8] min-h-screen flex flex-col relative">
      {/* Error toast */}
      {error && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-red-500 text-white px-4 py-2 rounded shadow-lg animate-fadeIn z-50">
          {error}
        </div>
      )}

      <div
        className="relative z-10 h-[46vh] flex flex-col items-center gap-4 sm:gap-8 pb-20"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <header className="pt-3 mb-2 sm:mb-0 text-center">
          <h1
            className="text-xl sm:text-3xl font-semibold bg-clip-text text-transparent 
          bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300  drop-shadow-[0_0_3px_#056] inline-block"
          >
            IP ADDRESS TRACKER
          </h1>
          <span className="ml-2 inline-block text-2xl animate-bounce">📍</span>
          <p className="text-white/80 text-sm sm:text-base mt-2">
            Track IP addresses & discover locations in real-time
          </p>
        </header>

        <div className="w-[77vw] sm:w-[40vw] flex">
          <form
            className="flex w-full sm:h-full bg-white rounded-2xl shadow-lg overflow-hidden"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="ip_address"
              value={ipInput}
              onChange={(e) => setIpInput(e.target.value)}
              placeholder="Search for any IP address or domain"
              className="flex-1 p-3 text-sm sm:text-lg font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className=" bg-indigo-700 hover:bg-indigo-800 transition-colors duration-200 w-[10%]"
            >
              <img
                src={submitArrow}
                alt="submit arrow"
                className="w-3 h-3 m-auto"
              />
            </button>
          </form>
        </div>

        <div className="bg-white/50 backdrop-blur-md text-center w-[90%] sm:w-[80%] rounded-2xl p-5 sm:p-8 m-auto grid grid-cols-1 sm:grid-cols-4 gap-4 sm:gap-8 sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 shadow-lg">
          <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-300 pb-3 sm:pb-0 sm:pr-4">
            <span className="text-gray-500 uppercase text-[10px] sm:text-xs tracking-widest">
              IP Address
            </span>
            <span className="text-base sm:text-lg text-gray-900 mt-1">
              {ipData?.ip || "Loading..."}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-300 pb-3 sm:pb-0 sm:pr-4">
            <span className="text-gray-500 uppercase text-[10px] sm:text-xs tracking-widest">
              Location
            </span>
            <span className="text-base sm:text-lg text-gray-900 mt-1">
              {ipData?.location?.city
                ? `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}`
                : "Loading..."}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center border-b sm:border-b-0 sm:border-r border-gray-300 pb-3 sm:pb-0 sm:pr-4">
            <span className="text-gray-500 uppercase text-[10px] sm:text-xs tracking-widest">
              Timezone
            </span>
            <span className="text-base sm:text-lg text-gray-900 mt-1">
              {ipData?.location?.timezone
                ? `UTC ${ipData.location.timezone}`
                : "Loading..."}
            </span>
          </div>

          <div className="flex flex-col items-center justify-center">
            <span className="text-gray-800 uppercase text-[10px] sm:text-xs tracking-widest">
              ISP
            </span>
            <span className="text-base sm:text-lg text-gray-900 mt-1">
              {ipData?.isp || "Loading..."}
            </span>
          </div>
        </div>
      </div>

      <div className="inset-0 z-0 w-full h-[55vh]">
        <MapSection ipData={ipData} />
      </div>
    </div>
  );
}

export default App;
