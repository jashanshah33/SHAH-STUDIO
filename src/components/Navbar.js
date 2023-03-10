import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { faXmark, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks";
import axios from "axios";

const Navbar = () => {
  const [Responsive, setResponsive] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [tracks, setTracks] = useState([]);
  const [searchBox, setSearchBox] = useState(false);
  
  const randomPlaylist = "499UwrOYZa7t0ZraJGewpy"
  const auth = useAuth();

  // fetch song seached
  const handelSearch = async () => {
    if (!searchKey) {
      return;
    }
    await axios
      .get("https://api.spotify.com/v1/search", {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        params: {
          q: searchKey,
          type: "track",
        },
      })
      .then((d) => {
        //console.log(d.data);
        setTracks(d.data.tracks.items);
        setSearchBox(true);
      });

      setSearchKey('')
  };

// to make navbar reponsive
  const handelClick = () => {
    setResponsive(!Responsive);
  };

  // calling logout function on click
  const handelLogout = () => {
    setResponsive(false);
    auth.logout();
  };


// making searchBox false when clicking on screen 
  document.addEventListener("click", function () {
    setSearchBox(false);
  });

  if (auth.token === null) {
    return <Redirect to={"login"} />;
  }
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={require("../images/brand-logo.png")} alt="" />
        </Link>
      </div>
      <span onClick={handelClick} style={{ display: "none" }}>
        <FontAwesomeIcon icon={Responsive ? faXmark : faBars} size="2x" />
      </span>
      <div className="search-container">
        <div>
          <input
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            type={"search"}
            placeholder={"Search"}
          />
        </div>
        <div>
          <FontAwesomeIcon
            onClick={handelSearch}
            className="search-icon"
            icon={faSearch}
          />
        </div>
        <div
          style={{ display: searchBox ? "block" : "none" }}
          className="search-box"
          onClick={(e) => e.stopPropagation()}
        >
          {tracks.map((track) => (
            <Link key={track.id} to={`/player/${randomPlaylist}/${track?.id}`}>
              <p onClick={()=> setSearchBox(false)} >{track.album.name}</p>
            </Link>
          ))}
        </div>
      </div>
      <div className="navigation_to_pages">
        <ul className={Responsive ? "responsiveUl" : "normalUl"}>
          <Link to={"/"}>
            <li onClick={() => setResponsive(false)}>Home</li>
          </Link>
          <Link to={'/favoutire'}>
          <li onClick={() => setResponsive(false)}>Favoutires</li>
          </Link>
          {auth.token ? (
            <>
              <li onClick={handelLogout}>Log Out</li>
            </>
          ) : (
            <>
              <Link to={"/login"}>
                <li onClick={() => setResponsive(false)}>Login</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
