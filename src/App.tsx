import React from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import AdminSystem from "./component/AdminSystem/AdminSystem";
import Chefs from "./component/Chefs/Chefs";
import SingleChef from "./component/Chefs/SingleChef/SingleChef";
import Home from "./component/Home/Home";
import LogIn from "./component/LogIn/LogIn";
import Restaurant from "./component/Restaurant/Restaurant";
import SingleRest from "./component/Restaurant/SingleRestPage/SingleRest";
import SignIn from "./component/SignIn/SignIn";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurant" element={<Restaurant />} />
        <Route path="restaurant/:restId" element={<SingleRest />} />
        <Route path="/chefs" element={<Chefs />} />
        <Route path="chefs/:chefId" element={<SingleChef />} />
        <Route path="/log-in" element={<LogIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/admin" element={<AdminSystem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
