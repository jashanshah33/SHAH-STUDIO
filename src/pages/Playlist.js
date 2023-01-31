import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Redirect, useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Playlists = () => {
  const [platlistArray, setPlatlistArray] = useState([]);
  const auth = useAuth();
  const { id } = useParams();
  let headerName = "";
  let playlist_id = "";

  if (id === "0JQ5DAqbMKFCWjUTdzaG0e") {
    playlist_id = "37i9dQZF1EQqkOPvHGajmW";
    headerName = "Indie";
  } else if (id === "0JQ5DAqbMKFHCxg5H5PtqW") {
    playlist_id = "7sTkp2X5Aq84v9w9UtfkaF";
    headerName = "Bollywood Songs";
  } else if (id === "0JQ5DAqbMKFKSopHMaeIeI") {
    headerName = "Punjabi Songs";
    playlist_id = "2HAXg6fz9Nuq0QSxOriQc8";
  } else if (id === "0JQ5DAqbMKFE33XAyDiPIr") {
    playlist_id = "7dsaybwBCqrrk0vbrEkAfz";
    headerName = "Tamil Songs";
  } else if (id === "0JQ5DAqbMKFIdOwkMWR5at") {
    playlist_id = "0Y9DWZ34PToWTM6wpChRGu";
    headerName = "Telugu Songs";
  }

  // console.log(id);

  useEffect(() => {
    const getLatestPunjabi = async () => {
      await axios

        .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        })
        .then((d) => {
          //console.log(d.data.tracks.items);
          setPlatlistArray(d?.data?.tracks?.items.slice(0, 50));
        });
    };

    getLatestPunjabi();
  }, [playlist_id,auth]);

  if (auth.token === null) {
    return <Redirect to={'/login'} />
   }
  return (
    <div className="playlist_by_caegories">
      <h1>{headerName}</h1>

      <div className="playlist-container">
        {platlistArray.length ? (
          <>
            {platlistArray.map((song, index) => (
              <Link
                key={`id${song?.track?.album?.id}, ${index}`}
                to={`/player/${playlist_id}/${song?.track?.id}`}
              >
                <div className="playlist">
                  <div className="playlist_icon">
                    <FontAwesomeIcon className="icon" icon={faCircle} />
                  </div>

                  <div className="playlist_img">
                    <img src={song?.track?.album?.images[0].url} />
                  </div>
                  <div className="description">
                    <h5>{song?.track?.album?.name}</h5>
                    <p>{song?.track?.artists[0].name}</p>
                  </div>
                </div>
              </Link>
            ))}
          </>
        ) : (
          <>
            <h1>Unable to Load</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Playlists;
