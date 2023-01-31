import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const auth = useAuth();

  useEffect(() => {

   //fetching songs Categories
    const getCategories = async () => {
       await axios

        .get("https://api.spotify.com/v1/browse/categories", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            country: "IN",
            locale: "sv_IN",
            limit: 6,
          },
        })
        .then((d) => {
          //console.log(d.data.categories);
          setCategories(d.data.categories.items);
        });
    };
    getCategories();
  }, [auth]);
  return (
    <div>
      <h1>Categories</h1>
      <div className="full-container">
        {categories.slice(1,6).map((item) => (
          <div key={item.id}>
            <img alt="" src={item.icons[0].url} />
            <Link to={`/playlist/${item.id}`}>
            <div className="play-btn">
             <div className="triangle"></div>
            </div>
            </Link>
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
