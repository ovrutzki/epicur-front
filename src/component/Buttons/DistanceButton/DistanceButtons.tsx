import React from "react";
import "./DistanceButton.css";
import { useState } from "react";
import { IButtons } from "../../../interFaces/interFaces";
import styled from "styled-components";

export const SortButtons = styled.input`
  -webkit-appearance: none;
  appearance: none;
  height: 2px;
  width: 17vw;
  background-color: #c6c6c6;
  pointer-events: none;
  &::-webkit-slider-thumb {
  }
`;

const DistanceButton: React.FC<IButtons> = (props:IButtons) => {
  const [distance, setDistance] = useState(2);
  const onChangeDisValue = (e:React.ChangeEvent<HTMLInputElement>) => {
    const targetElement: number  = Number(e.target.value)
    setDistance(targetElement);
  };

  return (
    <div ref={props.refProps} className="distance-popup">
          <h2>{props.name}</h2>
          <div id={props.name} className="slider-div" >
          <section><p>My Location</p><p>{distance}km</p></section>
            <SortButtons className="distance-input" id="from-dis-slider" value={0} min={0} max={4} type="range" onChange={onChangeDisValue} />
            <SortButtons className="distance-input" id="to-dis-slider" value={distance} min={0} max={4}  type="range" onChange={onChangeDisValue} />
          </div>
        </div>
  );
};

export default DistanceButton;
