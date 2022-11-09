import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";

const LatestHindi = () => {
  const [latestHindi, setLatestHindi] = useState([]);
  const auth = useAuth();

  useEffect(() => {
    const getLatestHindi = async () => {
      const data = await axios

        .get("https://api.spotify.com/v1/playlists/3bDJLJzvUBxBV4C7mezz6p", {
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
  }, []);
  return (
    <div>
      <h1>Latest Hindi</h1>
      <div className="full-container">
        {latestHindi.map((song) => (
          <div key={song.track.album.id}>
            <img src={song.track.album.images[0].url} />
            <h4>{song.track.album.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestHindi;
