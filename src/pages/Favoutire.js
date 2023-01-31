import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { faCircle, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

const Favoutires = () => {
  const [favoutireTracks, setFavoutireTracks] = useState([]);
  const auth = useAuth();
  const id = "312L27FribfVjHY0rD33Ks";


  useEffect(() => {
    //fetch Favoutire tracks
    const getFavoutireTracks = async () => {
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
                <div className="playlist favoutire">
                  <div className="playlist_left_container" >
                  <div className="playlist_icon">
                    <FontAwesomeIcon className="icon" icon={faCircle} />
                  </div>

                  <div className="playlist_img">
                    <img src={song?.track?.album?.images[0]?.url}  alt=''/>
                  </div>
                  <div className="description">
                    <h5>{song?.track?.album?.name}</h5>
                    <p>{song?.track?.artists[0]?.name}</p>
                  </div>
                </div>
                <div>
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{ color: "green" }}
                    size='2x'
                  ></FontAwesomeIcon>
                </div>
                </div>
            
              </Link>
            ))}
          </>
        ) : (
          <>
            <h1>Empty List</h1>
          </>
        )}
      </div>
    </div>
  );
};

export default Favoutires;
