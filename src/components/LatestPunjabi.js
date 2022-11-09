import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";

const LatestPunjabi = () => {
    const [latestPunjabi, setLatestPunjabi]= useState([])
    const auth = useAuth();

  useEffect(() => {
    const getLatestPunjabi = async () => {
        const data = await axios
  
          .get("https://api.spotify.com/v1/playlists/312L27FribfVjHY0rD33Ks", {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
     
          })
          .then((d) => {
           // console.log(d.data.tracks.items[0].track);
            setLatestPunjabi(d.data.tracks.items.slice(0,5))
          });
      };
  
      getLatestPunjabi();
  }, []);
  return (
    <div>
      <h1>Latest Punjabi</h1>
      <div className="full-container">
        {latestPunjabi.map((song) => (
          <div key={song.track.album.id}>
            <img src={song.track.album.images[0].url} />
            <h4>{song.track.album.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPunjabi
