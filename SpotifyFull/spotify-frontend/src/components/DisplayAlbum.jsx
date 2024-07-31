import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

const DisplayAlbum = ({ album }) => {
  const { id } = useParams();
  const [albumData, setAlbumsData] = useState("");
  const { albumsData, songsData, playWithId } = useContext(PlayerContext);
  // const albumData = albumsData[id];

  useEffect(() => {
    albumsData.map((item) => {
      if (item._id == id) {
        setAlbumsData(item);
      }
    });
  }, []);

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              src={assets.spotify_logo}
              className="inline-block w-5"
              alt=""
            />
            <b className="mx-2">Spotify</b>• 132,315,4 likes
            <b className="mx-2">• 50 Songs</b>
            about 2 hr 30 min
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b> Title
        </p>
        <p>Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img src={assets.clock_icon} className="m-auto w-4" alt="" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.album == album.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff26] cursor-pointer "
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="text-[15px] hidden sm:block">5 days ago</p>
            <p className="text-[15px] text-center ">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
