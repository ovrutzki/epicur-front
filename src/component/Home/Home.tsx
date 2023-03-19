import React from "react";
import Hero from "../Hero/Hero";
import Navbar from "../Navbar/Navbar";
import Popular from "../Popular/popular";
import Icons from "./Icons/icons";
import WeekChef from "./WeekChef/WeekChef";
import AboutUs from "./AboutUs/AboutUs";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IRootState } from "../../store/store/store";

const Home: React.FC=()=>{

    const restaurantsArray = useSelector(
        (state:IRootState) => state.restaurants.default
      );
    const dishesArray = useSelector(
        (state:IRootState) => state.dishes.allDishes
      );

    const navigate = useNavigate();

    return(<>
        <Navbar />
        <Hero />
        <Popular  kind ={restaurantsArray} header="popular restaurant in epicure:"/>
        <Popular kind ={dishesArray} header="SIGNATURE DISH OF:" />
        <Icons />
        <WeekChef />
        <AboutUs />
        <Footer />
    </>)

}

export default Home