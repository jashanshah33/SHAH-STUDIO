import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import axios from "axios";
import Categories from "../components/Categories";
import LatestPunjabi from "../components/LatestPunjabi";
import LatestHindi from "../components/LatestHindi";


const Home = () => {


  return (
    <div className="Home">
      <Categories/>
      <LatestPunjabi/>
      <LatestHindi/>
    </div>
  );
};

export default Home;
