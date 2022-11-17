import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Redirect, useParams } from "react-router-dom";
import {
  faPlay,
  faPause,
  faBackward,
  faForward,
  faVolumeHigh,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Player = () => {
  const [track, setTrack] = useState({});
  const [randomTrackList, setRandomTrackList] = useState([]);
  const auth = useAuth();
  const { playlistId, TrackId } = useParams();
  const [music, setMusic] = useState(false);
  const myRef = useRef();

  useEffect(() => {
    const getTrack = async () => {
      const data = await axios

        .get(`https://api.spotify.com/v1/tracks/${TrackId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            market: "ES",
          },
        })
        .then((d) => {
          setTrack(d.data);
          console.log({ "d.data": d.data });
        });
    };

    getTrack();

    const getRandomSongs = async () => {
      const data = await axios

        .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        })
        .then((d) => {
          //console.log(d.data.tracks.items);
          setRandomTrackList(d.data.tracks.items);
        });
    };

    getRandomSongs();
  }, [TrackId, auth.token]);

  const playPause = () => {
    setMusic(music ? false : true);
    if (music === false) {
      myRef.current.play();
    } else if (music === true) {
      myRef.current.pause();
    }
  };

  const handelLike = async () => {
    // const { data } = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
    //   headers: {
    //     Authorization: `Bearer ${auth.token}`,
    //   },
    //   // params: {
    //   //  ids:id
    //   // },
    // });
    // console.log(data);
  };

  const [trackNumber, setTrackNumber] = useState(0);
  const [randomTrack, setRandomTrack] = useState({});
  const [startRandom, setStartRandom] = useState(false);
  const [backward, setBackward] = useState(false);

  useEffect(() => {
    if (trackNumber >= 1) {
      setBackward(true);
    } else {
      setBackward(false);
    }
    console.log(randomTrackList);
    setRandomTrack(randomTrackList[trackNumber]?.track);

    console.log(randomTrack);
  }, [trackNumber]);

  const PreviousSong = () => {
    if (backward) {
      setTrackNumber(trackNumber - 1);
      setStartRandom(true);
      myRef.current.pause();
      setMusic(false);
    }
  };
  const NextSong = () => {
    setTrackNumber(trackNumber + 1);
    setStartRandom(true);
    myRef.current.pause();
    setMusic(false);
  };

  const fetchedTrack = startRandom ? randomTrack : track;

  if (auth.token === null) {
    return <Redirect to={"/login"} />;
  }

  return (
    <div className="player-container">
      {fetchedTrack ? (
        <>
          <div className="track_img">
            <img
              width={"100%"}
              height="100%"
              alt=""
              src={fetchedTrack?.album?.images[0].url}
            />
          </div>
          <div className="track_description">
            <h2>{fetchedTrack?.album?.name}</h2>
            <h3>{fetchedTrack?.album?.artists[0].name}</h3>
          </div>
          <div className="icons_container">
            <div className="heart-icon">
              <FontAwesomeIcon
                onClick={handelLike}
                icon={faHeart}
              ></FontAwesomeIcon>
            </div>

            <audio
              onEnded={() => setMusic(false)}
              src={fetchedTrack?.preview_url}
              ref={myRef}
            ></audio>

            <div className="middle_icons">
              <FontAwesomeIcon
                onClick={PreviousSong}
                icon={faBackward}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={playPause}
                icon={music ? faPause : faPlay}
              ></FontAwesomeIcon>
              <FontAwesomeIcon
                onClick={NextSong}
                icon={faForward}
              ></FontAwesomeIcon>
            </div>
            <div className="volume-icons">
              <FontAwesomeIcon icon={faVolumeHigh}></FontAwesomeIcon>

              <input
                onChange={(e) => (myRef.current.volume = e.target.value / 100)}
                className="range"
                type={"range"}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <h1>Track not Found</h1>
        </>
      )}
    </div>
  );
};
export default Player;
