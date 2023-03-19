import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { IDishes, IRestaurants, IRootState } from "../store/store";
import { restaurantSlice } from "./restaurantSlicer";

let dishes: IDishes[] = [];
const fetchDishesData = () => {
  const response = fetch(
    "https://eran-epicure-project-back.onrender.com/api/dishes"
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  return response;
};

dishes = await fetchDishesData();

let restaurants: IRestaurants[] = [];
const fetchRestaurantsData = () => {
  const response = fetch(
    "https://eran-epicure-project-back.onrender.com/api/restaurants"
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
  return response;
};

restaurants = await fetchRestaurantsData();

export const dishesSlicer = createSlice({
  name: "dishes",
  initialState: {
    value: dishes,
    allDishes: dishes,
    specificDishes: dishes,
    restaurants: restaurants,
  },
  reducers: {
    getDishesByRestId: (state, action) => {
      state.specificDishes = state.allDishes.filter(
        (dish) =>
          dish.restaurantId ===
          state.restaurants.find((rest) => rest.id === action.payload)?.id
      );
    },

    dishTimeFilter: (state, action) => {
      switch (action.payload) {
        case "Breakfast":
          state.value = state.specificDishes.filter((dish) =>
            dish.time.find((time) => time === "breakfast")
          );
          break;
        case "Lunch":
          state.value = state.specificDishes.filter((dish) =>
            dish.time.find((time) => time === "lunch")
          );

          break;
        case "Dinner":
          state.value = state.specificDishes.filter((dish) =>
            dish.time.find((time) => time === "dinner")
          );
          break;
        default:
          state.value = state.specificDishes;
          break;
      }
    },
  },
});

export const { dishTimeFilter, getDishesByRestId } = dishesSlicer.actions;
export default dishesSlicer.reducer;
