// import React from "react";

// import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { faPlayCircle, faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { getVideosApi, logUserOut } from "../../api/api";
import { useNavigate, useParams } from "react-router-dom";
import VideoThumbnail from "react-video-thumbnail";
import { getCookie } from "../../api/utility";

const Dashboard = () => {
  const [showControls, setShowControls] = useState(false);
  const [videos, setVideos] = useState([]);
  const [loadedVideo, setLoadedVideo] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const access = getCookie("id1");
  const refresh = getCookie("id2");

  const getTheVideos = () => {
  if(access && refresh)
  {
    getVideosApi().then((res) => {
      setVideos(res);
    });
  } else {
    window.location.reload
  }
  };
  useEffect(() => {
    getTheVideos();
    console.log(videos);
  }, []);

  const logMeOut = () => {
    logUserOut();
  };

  const handleThumbnailClick = () => {
    setShowControls(true);
  };

  useEffect(() => {
    // Find the video with the matching ID
    const foundVideo = videos?.find((video) => video?.id === id);
    setLoadedVideo(foundVideo);
  }, [id, videos]);

  const otherVideos = videos?.filter((video) => video?.id !== id);

  return (
    <section className="grid bg-[#051724]  h-[100vh] overflow-hidden">
      {" "}
      <div className="flex justify-between items-center px-5">
        <img
          src="https://app.jollofradio.com/assets/jollofradio-horizontal.cc936d7a.png"
          className="w-[100px] cursor-pointer"
          alt="Jollof.M"
        />
        <button
          onClick={() => logMeOut()}
          className="text-white border border-white py-3 px-4"
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col lg:flex-row w-[100vw] h-[100vh] bg-white justify-between overflow-hidden">
        <div className="w-[70vw] h-30vh lg:h-[100vh]">
          <div className="w-[100vw] lg:w-[70vw] lg:h-[600px] bg-black">
            <div
              onClick={handleThumbnailClick}
              className="w-[100%] h-[100%] grid center"
            >
              {!showControls && loadedVideo && (
                <div className="relative w-[100%] h-[300px] lg:h-[600px]">
                  {/* <img
                    src="https://images.pexels.com/photos/326055/pexels-photo-326055.jpeg"
                    className="w-full h-full object-cover cursor-pointer"
                    alt="Jollof.M"
                  /> */}
                  <ReactPlayer
                    url={loadedVideo?.video_file || ""}
                    className="m-auto"
                    playing={false}
                    width={"100%"}
                    height={"100%"}
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <FontAwesomeIcon
                      icon={faPlayCircle}
                      className="h-16 w-16 text-white"
                    />
                  </div>
                  {/* <VideoThumbnail
                    videoUrl="https://www.w3schools.com/tags/movie.mp4"
                    thumbnailHandler={(thumbnail) => console.log(thumbnail)}
                    // width={100}
                    // height={800}
                  /> */}
                </div>
              )}
              {showControls && (
                <div className="relative w-[100%] h-[300px] lg:h-[600px]">
                  <ReactPlayer
                    url={loadedVideo?.video_file || ""}
                    className="m-auto"
                    playing
                    controls
                    width={"100%"}
                    height={"100%"}
                  />
                </div>
              )}
            </div>
          </div>
          <div className="p-5">
            <p className="text-[40px] ">
              {loadedVideo?.title || "Click on a Video to Play"}
            </p>
            {loadedVideo && (
              <p className="text-[14px] text-gray-400">
                <FontAwesomeIcon icon={faUserCircle} />{" "}
                <span>{loadedVideo?.owner}</span>
              </p>
            )}
          </div>
        </div>

        <div className="w-[100%] h-[100%] lg:w-[30vw] overflow-auto px-2 py-5 bg-slate-100 ">
          {/* other videos  */}
          {otherVideos?.map((vid, i) => (
            <div
              key={i}
              className="p-5 flex gap-1 w-[100%] cursor-pointer"
              onClick={() => navigate(`/${vid?.id}`)}
            >
              <div className="min-w-[100px] h-[100px]">
                <img
                  src={vid?.thumbnail}
                  className="object-fit w-[100px] h-[100px] "
                />
              </div>
              <div className="px-4">
                <p className="text-[16px] text-wrap text-left">{vid?.title}</p>
                <p className="font-bold text-[12px] text-gray-500">
                  Posted by {vid?.owner}
                </p>
              </div>
            </div>
          ))}

          {/* other videos  */}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
