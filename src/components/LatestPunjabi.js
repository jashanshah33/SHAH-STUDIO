import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";
//import { faPlay } from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LatestPunjabi = () => {
  const [latestPunjabi, setLatestPunjabi] = useState([]);
  const auth = useAuth();
  const id = "312L27FribfVjHY0rD33Ks";

  useEffect(() => {
    const getLatestPunjabi = async () => {
      await axios
        .get(`https://api.spotify.com/v1/playlists/${id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        })
        .then((d) => {
          //  console.log(d);
          setLatestPunjabi(d?.data?.tracks?.items.slice(0, 5));
        });
    };

    getLatestPunjabi();
  }, [auth]);
  return (
    <div>
      <h1>Latest Punjabi</h1>
      <div className="full-container">
        {latestPunjabi.length ? (
          <>
            {latestPunjabi.map((song, index) => (
              <div key={`LatestPunjabi${song?.track?.album?.id}, ${index}`}>
                <img alt="" src={song?.track?.album?.images[0].url} />
                <Link to={`/player/${id}/${song?.track?.id}`}>
                  <div className="play-btn">
                    <div className="triangle"></div>
                  </div>
                </Link>
                <h4>{song?.track?.album?.name}</h4>
              </div>
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default LatestPunjabi;
