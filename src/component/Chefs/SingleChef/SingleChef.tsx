import React, { useEffect, useState } from "react";
import "./SingleChef.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRestaurants, IRootState } from "../../../store/store/store";
import Card from "../../Card/Card";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import { ICard, IChefCard } from "../../../interFaces/interFaces";
import axios from "axios";

const SingleChef: React.FC<IChefCard> = (props) => {
  const navigate = useNavigate();
  const chefArray = useSelector((state: IRootState) => state.chefs.value);
  const restArray = useSelector(
    (state: IRootState) => state.restaurants.default
  );
  let { chefId } = useParams();
  let chefIndex = chefArray.findIndex(
    (chef: IChefCard) => chef.id === Number(chefId)
  );
  const specificChef = chefArray[chefIndex];
  const [openAddingModal, setOpenAddingModal] = useState<boolean>(false);
  const chefRestaurants: (IRestaurants | ICard)[] = [];
  useEffect(() => {}, []);
  for (let i = 0; i < restArray.length; i++) {
    for (let j = 0; j < specificChef.restaurant.length; j++) {
      if (restArray[i].id === specificChef.restaurant[j]) {
        chefRestaurants.push(restArray[i]);
      }
    }
  }
  const firstName: string[] | undefined = specificChef?.name.split(" ");

  //   ======
  // adding restaurant
  const pushingRestToBackend = async (
    restName: string,
    restLong: number,
    restLat: number,
    restChef: string,
    openHour: number,
    closeHour: number,
    openingDays: number[],
    openingYear: number,
    imageURL: string,
    rating: string
  ) => {
    try {
      const addingRest = await axios.post(
        "https://eran-epicure-project-back.onrender.com/api/restaurants/adding",
        {
          id: restArray.length + 1,
          name: restName,
          address: [restLong, restLat],
          chef: restChef,
          chefId: specificChef.id,
          openHours: [openHour, closeHour],
          openDays: openingDays,
          openYear: openingYear,
          img: imageURL,
          dishes: [],
          rating: `/image/rating/${rating}.svg`,
        }
      );
      alert("restaurant added");
    } catch (err: any) {
      console.log(err.response.data);
      alert(err.response.data);
    }
  };

  return (
    <>
      <Navbar />
      <div id="chef-container">
        <div id="chef-details">
          <img src={specificChef.img} alt="" />
          <h1>{specificChef.name}</h1>
          <p>{specificChef.about}</p>
        </div>
        <h1>{firstName[0]}`s Restaurants:</h1>
        <div id="chef-restaurant">
          {chefRestaurants.map((rest: ICard, index: number) => (
            <Card
              key={index * 600}
              name={rest.name}
              img={rest.img}
              class="rest"
              id={rest.id}
              rating={rest.rating}
              chef={rest.chef}
              navigatePath={`/restaurant/${rest.id}`}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingleChef;
