import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LatestPunjabi = () => {
  const [latestPunjabi, setLatestPunjabi] = useState([]);
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
           console.log(d.data.tracks.items[0].track);
          setLatestPunjabi(d.data.tracks.items.slice(0, 5));
        });
    };

    getLatestPunjabi();
  }, []);
  return (
    <div>
      <h1>Latest Punjabi</h1>
      <div className="full-container">
        {latestPunjabi.map((song, index) => (
          <div key={`LatestPunjabi${song.track.album.id}, ${index}`}>
            <img src={song.track.album.images[0].url} />
          <Link to={`/player/${song.track.id}`}>
            <div className="play-btn">
              <div className="triangle"></div>
            </div>
            </Link>
            <h4>{song.track.album.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestPunjabi;
