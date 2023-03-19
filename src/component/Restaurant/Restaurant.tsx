import React from "react";
import styled from "styled-components";
import Filter from "../Filter/Filter";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import RenderRest from "./RenderRest/RenderRest";

export const PageTitle = styled.h1`
  display:none;
  @media screen and (max-width: 450px) {
    display:block;
    font-family: "Helvetica light";
    font-size: 5vw;
    font-weight: 200;
    padding-left:2vw;
  }
`;

const Restaurant: React.FC=()=>{

    return(<>
        <Navbar />
        <PageTitle>RESTAURANT</PageTitle>
        <Filter toRender='rest'/>
        <RenderRest />
        <Footer />
    </>)

}

export default Restaurant