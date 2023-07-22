import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import Perks from "../components/Perks";
import PhotosUploader from "../components/PhotosUploader";

const PlacesForm = () => {
  const { id } = useParams();
  const [formInputs, setFormInpts] = useState({
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: 1,
    price: "",
  });
  const [photos, setPhotos] = useState([]);
  const [perks, setPerks] = useState([]);
  const [redirect, setRedirect] = useState("");
  const allData = { ...formInputs, photos, perks };

  useEffect(() => {
    if (!id) return;

    axios.get(`/place/getplace/${id}`).then((res) => {
      const { data } = res;
      setFormInpts({
        title: data?.title,
        address: data?.address,
        description: data?.description,
        extraInfo: data?.extraInfo,
        checkIn: data?.checkIn,
        checkOut: data?.checkOut,
        maxGuests: data?.maxGuests,
        price: data?.price,
      });
      setPhotos(data?.photos);
      setPerks(data?.perks);
    });
  }, [id]);

  const savePlace = async (e) => {
    e.preventDefault();
    if (id) {
      // update an existin place
      await axios.put("/place/updateplace", { ...allData, id });
    } else {
      // add new place
      await axios.post("/place/addplace", allData);
    }
    setRedirect("/account/places");
  };

  const handleOnChange = (e) => {
    setFormInpts({ ...formInputs, [e.target.name]: e.target.value });
  };

  const preInput = (header, body) => {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{body}</p>
      </>
    );
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      <AccountNav />
      <form onSubmit={savePlace}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          value={formInputs.title}
          onChange={handleOnChange}
          name="title"
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          value={formInputs.address}
          onChange={handleOnChange}
          name="address"
          placeholder="address"
        />
        {preInput("Photos", "more = better")}
        <PhotosUploader photos={photos} setPhotos={setPhotos} />
        {preInput("Description", "description of the place")}
        <textarea
          value={formInputs.description}
          onChange={handleOnChange}
          name="description"
        />
        {preInput("Perks", "select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <Perks selected={perks} onChange={setPerks} />
        </div>
        {preInput("Extra info", "house rules, etc")}
        <textarea
          value={formInputs.extraInfo}
          onChange={handleOnChange}
          name="extraInfo"
        />
        {preInput(
          "Check in&out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              value={formInputs.checkIn}
              onChange={handleOnChange}
              name="checkIn"
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              value={formInputs.checkOut}
              onChange={handleOnChange}
              name="checkOut"
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              value={formInputs.maxGuests}
              onChange={handleOnChange}
              name="maxGuests"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              value={formInputs.price}
              onChange={handleOnChange}
              name="price"
            />
          </div>
        </div>
        <button className="primary my-4">{id ? "Update" : "Save"}</button>
      </form>
    </>
  );
};

export default PlacesForm;
