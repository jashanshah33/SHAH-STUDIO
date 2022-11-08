import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { faXmark, faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../hooks";

const Navbar = () => {
  const [Responsive, setResponsive] = useState(false);
  const auth = useAuth();

  const handelClick = () => {
    setResponsive(!Responsive);
  };

  const handelLogout = () => {
    setResponsive(false);
    auth.logout();
  };

  if (auth.token === null) {
    return <Redirect to={"login"} />;
  }

  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to={"/"}>
          <img src={require("../images/brand-logo.png")} />
        </Link>
      </div>
      <span onClick={handelClick} style={{ display: "none" }}>
        <FontAwesomeIcon icon={Responsive ? faXmark : faBars} size="2x" />
      </span>
      <div className="search-container">
        <div>
          <input type={"search"} />
        </div>
        <div>
          <FontAwesomeIcon
            className="search-icon"
            icon={faSearch}
          />
        </div>
      </div>
      <div className="navigation_to_pages">
        <ul className={Responsive ? "responsiveUl" : "normalUl"}>
          <Link to={"/"}>
            <li onClick={() => setResponsive(false)}>Home</li>
          </Link>
          <li onClick={() => setResponsive(false)}>Favoutires</li>
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
