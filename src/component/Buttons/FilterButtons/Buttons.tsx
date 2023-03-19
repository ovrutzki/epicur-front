import React from "react";
import { IButtons } from "../../../interFaces/interFaces";
import "./Buttons.css";
import styled from "styled-components";
import { mainFilter } from "../../../store/slicer/restaurantSlicer";

export const SimpleButtons = styled.button`
  font-family: "Helvetica light";
  font-size: 1.2vw;
  cursor: pointer;
  border-radius: 6px;
  border: none;
  font-weight: 300;
  &:hover {
    font-weight: bolder;
  }
  &:focus {
    font-family: "Helvetica medium";
    font-weight: bolder;
  }
  @media screen and (max-width: 450px){
    font-size: 4vw;
    &:focus {
      font-family: "Helvetica medium";
      font-weight: bold;
      text-decoration:underline 1.8px solid rgba(222, 146, 0, 0.9);
    }
  }
`;


const FilterButtons: React.FC<IButtons> = (props: IButtons) => {

  return (
    <>
      <SimpleButtons
        id={props.name}
        value={props.name}
        onClick={props.onClick}
      >
        {props.name}
      </SimpleButtons>
    </>
  );
};

export default FilterButtons;


