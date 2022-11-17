import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
//import { faPlay } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LatestHindi = () => {
  const [latestHindi, setLatestHindi] = useState([]);
  const auth = useAuth();
  const id = "3bDJLJzvUBxBV4C7mezz6p"

  useEffect(() => {
    const getLatestHindi = async () => {
      const data = await axios

        .get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((d) => {
          //console.log(d.data.tracks.items[0].track);
          setLatestHindi(d.data.tracks.items.slice(0, 5));
        });
    };

    getLatestHindi();
  }, [auth.token]);
  return (
    <div>
      <h1>Latest Hindi</h1>
      <div className="full-container">
        {latestHindi.map((song) => (
          <div key={song.track.album.id}>
            <img alt="" src={song.track.album.images[0].url} />
            <Link to={`/player/${id}/${song.track.id}`}>

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

export default LatestHindi;
