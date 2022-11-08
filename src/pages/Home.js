import React, { useEffect, useState } from "react";
import { useAuth } from "../hooks";
import axios from "axios";

const Home = () => {
  // const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  const auth = useAuth();

  useEffect(()=>{
    const getAlbum = async () => {
      const data = await axios
        .get("https://api.spotify.com/v1/albums", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          params: {
            ids: "45ZIondgVoMB84MQQaUo9T",
            market: "ES",
          },
        })
        .then((d) => {
          console.log(d.data);
          // setArtists(d.data.artists.items);
        });
    };
    getAlbum()
  },[])



  // const renderArtists = () => {
  //   return artists.map((artist) => (
  //     <div key={artist.id}>
  //       {artist.images.length ? (
  //         <img width={"100%"} src={artist.images[0].url} alt="" />
  //       ) : (
  //         <div>No Image</div>
  //       )}
  //       {artist.name}
  //     </div>
  //   ));
  // };

  return (
    <div className="App">
     
    </div>
  );
};

export default Home;
