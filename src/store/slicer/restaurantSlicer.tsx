import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";
import { IRestaurants } from "../store/store";

let restaurants:IRestaurants[] = [];
const fetchRestaurantsData = () => {
  const response = fetch("http://localhost:8000/api/restaurants")
  .then((response) => {
    return response.json()
  })
  .catch((err) => console.log(err));
  return response;
}

restaurants = await fetchRestaurantsData()

export const restaurantSlice = createSlice({
  name: "restaurants",
  initialState: {
    value: restaurants,
    default: restaurants
  },
  reducers: {
    mainFilter: (state, action) => {
      let d = new Date();
      let open: Array<any> = [];

      switch (action.payload){
        case "All":
      state.value = state.default ;
      break;
    case "New":
      let year = d.getFullYear();
      state.value = []
      for (let i = 0; i < state.default.length; i++) {
        if (year - state.default[i].openYear === 0) {
          state.value.push(state.default[i]);
        }
      }
      break;
      case "Open Now":
      let hour = d.getHours();
      let day = d.getDay();
      for (let i = 0; i < state.default.length; i++) {
        if (
          state.default[i].openHours[0] < hour &&
          hour < state.default[i].openHours[1] &&
          state.default[i].openDays.includes(day)
        ) {
          open.push(state.default[i]);
        }
      }
      state.value = open;
      break;
    case "Most Popular":
      let mostPopular1 = state.default.filter((rest: any) =>
        rest.rating.includes("5")
      );
      let mostPopular2 = state.default.filter((rest: any) =>
        rest.rating.includes("4")
      );
      state.value = [...mostPopular1, ...mostPopular2];
      break;
    default:
      state.value = state.default;
      break;
      }
    },
    ratingFilter: (state, action) =>{



    }

  },
});

export const {mainFilter , ratingFilter} = restaurantSlice.actions
export default restaurantSlice.reducer;
