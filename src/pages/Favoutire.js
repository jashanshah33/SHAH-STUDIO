import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const Favoutires = () => {
  const [favoutireTracks, setFavoutireTracks] = useState([]);
  const auth = useAuth();
  const id = "312L27FribfVjHY0rD33Ks";


  // const playlist_id = "2VHdhD77ZP0A3GuJ1MVEfQ";

  // console.log(id);

  useEffect(() => {
    const getFavoutireTracks = async () => {
      //   const { data } = await axios.get(`https://api.spotify.com/v1/me/playlists`, {
      //     headers: {
      //       Authorization: `Bearer ${auth?.token}`,
      //     },
      //   });
      //   setPlayListId(data?.items[0]?.id)
      //   console.log(data?.items[0]?.id);
      // let playlistId = await data?.items[0]?.id
      //   if (playlistId) {
      //     await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      //       headers: {
      //         Authorization: `Bearer ${auth?.token}`,
      //       },
      //     })
      //     .then((d) => {
      //       console.log(d?.data);
      //       setFavoutireTracks(d?.data?.items)
      //     })
      //   }
      const { data } = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setFavoutireTracks(data?.items);
    };
    getFavoutireTracks();
  }, [auth]);
  return (
    <div className="playlist_by_caegories">
      <h1>Favoutires</h1>

      <div className="playlist-container">
        {favoutireTracks.length ? (
          <>
            {favoutireTracks.map((song, index) => (
              <Link
              to={`/player/${id}/${song?.track?.id}`}
                key={`id${song?.track?.album?.id},${index}`}

              >
                <div className="playlist">
                  <div className="playlist_icon">
                    <FontAwesomeIcon className="icon" icon={faCircle} />
                  </div>

                  <div className="playlist_img">
                    <img src={song?.track?.album?.images[0]?.url} />
                  </div>
                  <div className="description">
                    <h5>{song?.track?.album?.name}</h5>
                    <p>{song?.track?.artists[0]?.name}</p>
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

export default Favoutires;
