import React from "react";
import Categories from "../components/Categories";
import LatestPunjabi from "../components/LatestPunjabi";
import LatestHindi from "../components/LatestHindi";
import { useAuth } from "../hooks";
import { Redirect } from "react-router-dom";

const Home = () => {
const auth = useAuth()

if (!auth?.token) {
  return <Redirect to={'/login'}/>
}

  return (
    <div className="Home">
      <Categories/>
      <LatestPunjabi/>
      <LatestHindi/>
    </div>
  );
};

export default Home;
