import { createSlice } from "@reduxjs/toolkit";
import { IChefs } from "../store/store";

let chefs: IChefs[] = [];
const fetchChefsData = () => {
  const response = fetch("http://localhost:8000/api/chefs")
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
