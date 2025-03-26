import { useState, useEffect } from "react";
import submitArrow from "./assets/images/icon-arrow.svg";
import mobileBg from "./assets/images/pattern-bg-mobile.png";
import desktopBg from "./assets/images/pattern-bg-desktop.png";
import "leaflet/dist/leaflet.css";
import MapSection from "./Map";


function App() {
  const [ipData, setIpData] = useState(null);
  const [ipInput, setIpInput] = useState("");
  const backgroundImage = window.innerWidth >= 640 ? desktopBg : mobileBg;


  useEffect(() => {
    fetchIPData(""); // Fetch user's own IP initially
  }, []);

  const fetchIPData = async (ip) => {
    const apiKey = import.meta.env.VITE_IPIFY_API_KEY;
    console.log(apiKey);
    const url = `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=${ip}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      setIpData(data);
    } catch (error) {
      console.error("Error fetching IP data:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchIPData(ipInput);
  };

  return (
    <>
    <div className="bg-[#c8c8c8] min-h-screen flex flex-col">
      <div className='relative z-10 search-section h-[46vh] flex flex-col items-center gap-4 sm:gap-8 pb-20'
        style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
    <header className="pt-3 mb-2 sm:mb-0">
      <h1 className="text-xl sm:text-3xl text-center font-semibold text-white ">IP Address Tracker</h1>
    </header>
      <div className="w-[77vw] sm:w-[40vw] flex">
      <form className="flex w-full sm:h-full" onSubmit={handleSubmit}>
        <input 
        type="text" 
        name="ip_adress" 
        value={ipInput}
        onChange={(e) => setIpInput(e.target.value)}
        placeholder="Search for any IP address or domain"
        className="border bg-white p-2 w-[90%]  text-sm sm:text-lg font-medium rounded-l-lg "/>

        <button type="submit" className="border rounded-r-lg bg-black w-[10%]">
          <img 
          src={submitArrow}
           alt="submit arrow"
           className='w-3 h-3 m-auto'/>
        </button>
      </form>
      </div>
    <div className='bg-white text-center w-[77%] sm:w-[90%] rounded-2xl p-3 m-auto flex flex-col sm:flex-row items-center text-sm font-semibold gap-1 sm:gap-10 sm:justify-center text-[#] sm:absolute sm:bottom-0 sm:left-1/2 sm:-translate-x-1/2 sm:translate-y-1/2 sm:h-[60%]'>
      
      <span className='flex flex-col items-center'>
        <span>IP Address</span>
        <span className='text-lg'>{ipData?.ip || "Loading..."}</span>
      </span>

      <span className='flex flex-col items-center'>
        <span>Loaction</span>
        <span className='text-lg'>{ipData?.location?.city ? `${ipData.location.city}, ${ipData.location.region}, ${ipData.location.country}` : "Loading..."}
        </span>
      </span>

      <span className='flex flex-col items-center'>
      <span>Timezone</span>
      <span className='text-lg'>{ipData?.location?.timezone ? `UTC ${ipData.location.timezone}` : "Loading..."}</span>
      </span>

      <span className='flex flex-col items-center'>
        <span>ISP</span>
        <span className='text-lg'>{ipData?.isp || "Loading..."}</span>
      </span>
    </div>

    </div>
    <div className="inset-0 z-0 w-full h-[55vh]">
    <div className="  w-full h-full">
    <MapSection ipData={ipData} />
  </div>
  </div>

</div>
    </>
  );
}

export default App;
