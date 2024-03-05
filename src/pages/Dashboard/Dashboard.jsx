// import React from "react";

import { useState } from "react";
import ReactPlayer from "react-player";

const Dashboard = () => {
  const [showControls, setShowControls] = useState(false);

  const handleThumbnailClick = () => {
    setShowControls(!showControls);
  };
  return (
    <section className="grid bg-[#051724]  h-[100vh]">
      {" "}
      <div className="flex flex-col items-center">
        <img
          src="https://app.jollofradio.com/assets/jollofradio-horizontal.cc936d7a.png"
          className="w-[100px] cursor-pointer"
          alt="Jollof.M"
        />
      </div>
     <div onClick={handleThumbnailClick}>
     {!showControls && (
        <img
          src="../../assets/hello.png"
          className="w-[100px] cursor-pointer"
          alt="Jollof.M"
        />
      )}
      {showControls && (
        <ReactPlayer url="https://www.w3schools.com/tags/movie.mp4" playing />
      )}
     </div>
    </section>
  );
};

export default Dashboard;
