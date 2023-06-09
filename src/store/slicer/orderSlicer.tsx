import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { addCartToUserData } from "../../utils/UserUtils/addCartToUserData";
import { deleteFromCartDB } from "../../utils/UserUtils/deleteDishFromCart";
import { IDishes, IOrder, IOrderState } from "../store/store";

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

export const orderSlicer = createSlice({
  name: "order",
  initialState: {
    allDishes: dishes,
    value: [],
    checkoutPrice: 0,
  },
  reducers: {
    deleteFromCart: (state: IOrder, action) => {
      state.value = state.value.filter((dish) => dish.dishId !== action.payload)
      if(sessionStorage.getItem('user-token')){
        deleteFromCartDB(action.payload)
      }
      },
    addToCart: (state: IOrder, action) => {
      if (
        state.value.every(
          (dish: IOrderState) =>
            dish.restaurantId === action.payload.restaurantId
        )
      ) {
        state.value = [...state.value, action.payload];
        state.checkoutPrice += action.payload.totalPrice;
        sessionStorage.setItem("dish-in-cart", JSON.stringify(state.value));
        if (sessionStorage.getItem("user-logged-in")) {
          addCartToUserData(action.payload);
        }
      } else {
        alert("we can`t do order from more then 0ne restaurant");
      }
    },
    getCartFromDb: (state: IOrder, action) => {
      state.value = action.payload.dishInCart;
      sessionStorage.setItem("dish-in-cart", JSON.stringify(state.value));
      const totalPriceArray = action.payload.dishInCart.map(
        (price: any) =>  price.totalPrice)

      state.checkoutPrice = totalPriceArray.reduce(
        (accumulator: number, currentValue: number) =>
          accumulator + currentValue,0);
    },
    emptyCart: (state) => {
      state.value = [];
    },
    
  },
});

export const { addToCart, deleteFromCart, getCartFromDb, emptyCart } =
  orderSlicer.actions;
export default orderSlicer.reducer;
