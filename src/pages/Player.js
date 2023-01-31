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
  const [music, setMusic] = useState(false);
  const [liked, setLiked] = useState(false);
  const [trackNumber, setTrackNumber] = useState(0);
  const [randomTrack, setRandomTrack] = useState({});
  const [startRandom, setStartRandom] = useState(false);
  const [backward, setBackward] = useState(false);
  const { playlistId, TrackId } = useParams();


  const myRef = useRef();
  const auth = useAuth();

  //to make music and randomsongs OFF, whenever Track Change
  useEffect(() => {
    setMusic(false);
    setStartRandom(false)

  }, [TrackId]);

//as soon as user land on player page track and playist will me fetched
  useEffect(() => {
    const getTrack = async () => {
       await axios

        .get(`https://api.spotify.com/v1/tracks/${TrackId}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
          params: {
            market: "ES",
          },
        })
        .then((d) => {
          setTrack(d?.data);
          // console.log({ "d.data": d.data });
        });
    };

    getTrack();

    const getRandomSongs = async () => {
       await axios

        .get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        })
        .then((d) => {
          //console.log(d.data.tracks.items);
          setRandomTrackList(d?.data?.tracks?.items);
        });
    };

    getRandomSongs();
  }, [TrackId, playlistId, auth?.token]);

  //to test the trackNumber and set random track whenever tracknumber and randomTrackList change

  useEffect(() => {
    if (trackNumber >= 1) {
      setBackward(true);
    } else {
      setBackward(false);
    }
    //console.log(randomTrackList);
    setRandomTrack(randomTrackList[trackNumber]?.track);

    //console.log(randomTrack);
  }, [trackNumber, randomTrackList]);

//handel play and pause
  const playPause = () => {
    setMusic(music ? false : true);
    if (music === false) {
      myRef.current.play();
    } else if (music === true) {
      myRef.current.pause();
    }
  };

//handel previous song
  const PreviousSong = () => {
    if (backward) {
      setTrackNumber(trackNumber - 1);
      setStartRandom(true);
      myRef.current.pause();
      setMusic(false);
    }
  };

//handel next song
  const NextSong = () => {
    setTrackNumber(trackNumber + 1);
    setStartRandom(true);
    myRef.current.pause();
    setMusic(false);
  };

  // show track accordingly
  const fetchedTrack = startRandom ? randomTrack : track;


  useEffect(() => {
    //check if song is fav or not
    const checkIfSongIsFav = async () => {
      const { data } = await axios.get(`https://api.spotify.com/v1/me/tracks`, {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      const LikedSong = await data.items.filter((song) => {
        return song?.track?.id === fetchedTrack?.id;
      });

      if (LikedSong.length) {
        setLiked(true);
      } else {
        setLiked(false);
      }
    };
    checkIfSongIsFav();
  }, [liked, fetchedTrack, auth?.token]);

  // toggle like function
  const handelLike = async () => {
    setLiked(!liked);
    if (liked) {
      await axios.delete(
        `https://api.spotify.com/v1/me/tracks?ids=${fetchedTrack?.id}`,
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      // console.log(response);
    } else {
      await axios.put(
        "https://api.spotify.com/v1/me/tracks",
        { ids: [fetchedTrack?.id] },
        { headers: { Authorization: `Bearer ${auth?.token}` } }
      );
      // console.log(response);
    }
  };

  
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
            <h3>{fetchedTrack?.album?.artists[0]?.name}</h3>
          </div>
          <div className="icons_container">
            <div className="heart-icon">
              {liked ? (
                <>
                  <FontAwesomeIcon
                    onClick={handelLike}
                    icon={faHeart}
                    style={{ color: "green" }}
                  ></FontAwesomeIcon>
                </>
              ) : (
                <>
                  <FontAwesomeIcon
                    onClick={handelLike}
                    icon={faHeart}
                  ></FontAwesomeIcon>
                </>
              )}
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
