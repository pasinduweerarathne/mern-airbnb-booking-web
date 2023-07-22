import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Image from "../components/Image";

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    axios.get("/place/getplaces").then((res) => setPlaces(res.data));
  }, []);

  return (
    <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-14">
      {places.map((place, i) => (
        <div key={i}>
          <Link to={`/place/${place._id}`} className="bg-gray-500 rounded-2xl">
            {place.photos.length > 0 && (
              <Image
                className="rounded-2xl aspect-square object-cover"
                src={place.photos[0]}
                alt=""
              />
            )}
          </Link>
          <h3 className="font-bold truncate">{place.address}</h3>
          <h2 className="text-sm text-gray-500">{place.title}</h2>
          <div>
            <b>${place.price}</b> night
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
