import React from "react";
import Filter from "../Filter/Filter";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import ChefCard from "./ChefCard/ChefCard";

const Chefs: React.FC=()=>{

    return(<>
        <Navbar />
        <Filter />
        <ChefCard />
        <Footer />
    </>)

}

export default Chefs