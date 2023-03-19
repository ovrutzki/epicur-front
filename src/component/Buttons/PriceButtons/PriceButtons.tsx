import { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { IButtons } from "../../../interFaces/interFaces";
import {  } from "../../../store/slicer/restaurantSlicer";
import "./PriceButton.css"

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

export const PriceButton:React.FC<IButtons> = (props: IButtons) => {
  const dispatch = useDispatch()
    const [minValue, setMinValue] = useState(10);
    const onChangeMinValue = (e:React.ChangeEvent<HTMLInputElement>):void =>{
      const minTarget = Number(e.target.value)
      setMinValue(minTarget)
    }

    const [maxValue, setMaxValue] = useState(357);
    const onChangeMaxValue = (e:React.ChangeEvent<HTMLInputElement>):void =>{
      const maxTarget = Number(e.target.value)
      setMaxValue(maxTarget)
    }
  
    return (
        <div ref={props.refProps} className="price-popup">
          <h2>{props.name} selected</h2>
          { minValue < maxValue ? <p>₪{minValue} - ₪{maxValue}</p>  : <p>₪{maxValue}- ₪{minValue}</p>  }
          <div id={props.name} className="slider-div" >
            <section><p>₪{minValue}</p><p>₪{maxValue}</p></section>
            <SortButtons className="price-input" id="from-slider" value={minValue} min={12} max={357} type="range" onChange={onChangeMinValue} />
            <SortButtons className="price-input" id="to-slider" value={maxValue} min={12} max={357}  type="range" onChange={onChangeMaxValue} />
          </div>
        </div>
    );
  };