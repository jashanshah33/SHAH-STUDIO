import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";

const Playlists = () => {
  const [latestPunjabi, setLatestPunjabi] = useState([]);
  const auth = useAuth();
  const { id } = useParams();
  let headerName = "";
  let playlist_id = "";

  if (id === "toplists") {
    playlist_id = "5ABHKGoOzxkaa28ttQV9sE";
    headerName = "Top List";
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
      const data = await axios

        .get(`https://api.spotify.com/v1/playlists/${playlist_id}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((d) => {
         console.log(d.data.tracks.items[0].track.artists);
          setLatestPunjabi(d.data.tracks.items.slice(0, 50));
        });
    };

    getLatestPunjabi();
  }, [playlist_id]);
  return (
    <div className="playlist_by_caegories">
      <h1>{headerName}</h1>

      <div className="playlist-container">
        {latestPunjabi.map((song, index) => (
          <div className="playlist" key={`id${song.track.album.id}, ${index}`}>
            <div className="playlist_icon">
            <FontAwesomeIcon className='icon' icon={faCircle} />
            </div>

            <div className="playlist_img">
              <img src={song.track.album.images[0].url} />
            </div>
            <div className="description">
              <h5>{song.track.album.name}</h5>
              <p>{song.track.artists[0].name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlists;
