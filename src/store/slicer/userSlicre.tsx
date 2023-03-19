import { createSlice } from "@reduxjs/toolkit";


interface IDetails {
  email: string;
  password: string;
}

export const userSlicer = createSlice({
  name: "user",
  initialState: {
    value: [],
    token:"",
    userInfo:{}
  },
  reducers: {
    getUserData: (state, action) => {
      state.userInfo = action.payload;
    },
    getUserToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { getUserData, getUserToken } = userSlicer.actions;
export default userSlicer.reducer;
