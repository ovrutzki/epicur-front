import { createSlice } from "@reduxjs/toolkit";
import { IChefs } from "../store/store";

let chefs: IChefs[] = [];
const fetchChefsData = () => {
  const response = fetch(
    "https://eran-epicure-project-back.onrender.com/api/chefs"
  )
    .then((response) => {
      return response.json();
    })
    .catch((err) => err);
  return response;
};

chefs = await fetchChefsData();

export const chefsSlicer = createSlice({
  name: "chefs",
  initialState: {
    value: chefs,
  },
  reducers: {},
});

export default chefsSlicer.reducer;
