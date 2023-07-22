import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AccountNav from "../components/AccountNav";

const PlaceDetails = () => {
  const { id } = useParams();
  const [placeInfo, setPlaceInfo] = useState({});
  console.log(placeInfo?.photos);

  useEffect(() => {
    axios.get(`/place/getplace/${id}`).then((res) => setPlaceInfo(res.data));
  }, [id]);

  return (
    <>
      <AccountNav />
      <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
        <h1 className="text-3xl">{placeInfo.title}</h1>
        {/* <AddressLink>{placeInfo.address}</AddressLink> */}
        {/* <PlaceGallery place={place} /> */}
        <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
          <div>
            <div className="my-4">
              <h2 className="font-semibold text-2xl">Description</h2>
              {placeInfo.description}
            </div>
            Check-in: {placeInfo.checkIn}
            <br />
            Check-out: {placeInfo.checkOut}
            <br />
            Max number of guests: {placeInfo.maxGuests}
          </div>
          <div>{/* <BookingWidget place={place} /> */}</div>
        </div>
        <div className="bg-white -mx-8 px-8 py-8 border-t">
          <div>
            <h2 className="font-semibold text-2xl">Extra info</h2>
          </div>
          <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
            {placeInfo.extraInfo}
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceDetails;
