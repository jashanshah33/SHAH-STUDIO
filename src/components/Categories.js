import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../hooks";

const Categories = () => {
  const [categories, setCategories] = useState([]);
    const auth = useAuth();

  useEffect(() => {
    const getCategories = async () => {
      const data = await axios

        .get("https://api.spotify.com/v1/browse/categories", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            country: "IN",
            locale: "sv_IN",
            limit: 5,
          },
        })
        .then((d) => {
          // console.log(d.data.categories.items);
          setCategories(d.data.categories.items);
        });
    };
    getCategories();
  }, []);
  return (
    <div>
      <h1>Categories</h1>
      <div className="full-container">
        {categories.map((item) => (
          <div key={item.id}>
            <img src={item.icons[0].url} />
            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories
