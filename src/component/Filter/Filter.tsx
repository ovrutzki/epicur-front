import React, { useEffect } from "react";
import {MouseEvent} from "react"
import FilterButtons from "../Buttons/FilterButtons/Buttons";
import "./Filter.css";
import { useState } from "react";
import RenderRest from "../Restaurant/RenderRest/RenderRest";
import ChefCard from "../Chefs/ChefCard/ChefCard";
import FilterContainer from "../Buttons/FilterContainer/FilterContainer";
import { useDispatch } from "react-redux";
import { mainFilter } from "../../store/slicer/restaurantSlicer";

interface IRender {
  toRender: string;
}
const Filter: React.FC<any> = (props: any) => {
  const btnNames:string[] = ["All", "New", "Most Popular", "Open Now", "Map View", "Most View"]
  const dispatch = useDispatch();
  const [filter, setFilter] = useState("All");
  dispatch(mainFilter(filter));

  useEffect(() => {
    dispatch(mainFilter(filter));

  }, [filter]);

  const filterEvent= (e:Event):void => {
    const target = e.target as HTMLInputElement;
    setFilter(target.value);
  }
  return (
    <>
      <div id="main-filter">
        <div id="filter-div">
          {btnNames.map((btn, index:number)=>(
            props.toRender ?
           (index<5) && <FilterButtons
              key={index*200}
              name={btn}
              onClick={filterEvent}
            /> : (index != 2 && index != 3 && index != 4) &&  <FilterButtons
            key={index*300}
            name={btn}
            onClick={filterEvent}
          />
          ))}
        </div>
        {props.toRender && (
          <div id="range-div">
            <FilterContainer name={""} />
          </div>
        )}
      </div>
    </>
  );
};

export default Filter;
