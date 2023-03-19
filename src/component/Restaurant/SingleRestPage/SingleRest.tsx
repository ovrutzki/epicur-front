import React from "react";
import "./SingleRest.css";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { IRestaurants, IRootState } from "../../../store/store/store";
import Card from "../../Card/Card";
import DishesRender from "../DishesRender/DishesRender";
import Navbar from "../../Navbar/Navbar";
import Footer from "../../Footer/Footer";
import axios from "axios";

const SingleRest: React.FC<any> = (props) => {
  const navigate = useNavigate();

  let { restId } = useParams();
  const restArray = useSelector((state: IRootState) => state.restaurants.value);
  let restIndex = restArray.findIndex((e:IRestaurants) => e.id === Number(restId));
  let d = new Date();
  const specificRest = restArray[restIndex];

  
  const afterDelete = () => {
    navigate("/");
    // setGreeting(false);
  };


  return (
    <>
      <Navbar />
      <div id="main">
        <Card
          class="single-rest"
          img={specificRest.img}
          name={specificRest.name}
          chef={specificRest.chef}
          id={specificRest.id}
          navigatePath={""}
        />
        {specificRest.openDays.findIndex((e) => e === d.getDay()) !== -1 &&
        specificRest.openHours[0] < d.getHours() &&
        specificRest.openHours[1] > d.getHours() ? (
          <div className="open-now-div">
            <img className="open-now" src="/image/icons/open now.svg" />
          </div>
        ) : null}
        <DishesRender restId={Number(restId)}/>
      </div>
      <Footer />
    </>
  );
};

export default SingleRest;
