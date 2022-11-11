import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Link, useParams } from "react-router-dom";

const Player = () => {
  const [track, setTrack] = useState([]);
  const auth = useAuth();
  const { id } = useParams();
  //console.log(id);

  useEffect(() => {
    const getTrack = async () => {
      const data = await axios

        .get(`https://api.spotify.com/v1/tracks/${id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((d) => {
          setTrack(d.data);
          console.log(d.data);
        });
    };

    getTrack();
  }, [id]);

  console.log(track);

  return (
    <div className="player-container">
      {track.length ? <h1>{track.album.artists[0].name}</h1> : <h1>hello</h1>}
      <h1>{track.album.artists[0].name}</h1>
    </div>
  );
};
export default Player;
