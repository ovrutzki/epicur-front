import React from "react";
import "./WeekChef.css";
import {useSelector} from "react-redux"
import { IRootState } from "../../../store/store/store";

const WeekChef: React.FC = () => {
    const chefsArray = useSelector(
        (state:IRootState) => state.chefs.value
      );
      const restArray = useSelector(
        (state:IRootState) => state.restaurants.value
      );
    const popularChef = chefsArray.find((best)=>best.name.includes("Yosi Shitrit"))
    const firstName:string[] | undefined = popularChef?.name.split(" ")
    const chefRest = restArray;
    chefRest.find(x => x.chefId === 1);
      return (<>
      <div id="chef-of-the-week">
        <h1>Chef of the week:</h1>
        <div id="chef-info">
            <section id="chef-img">
            <img src={popularChef?.img} key={popularChef?.img} alt=""  />
            <h1>{popularChef?.name}</h1>
            </section>
            <p id="chef-about">{popularChef?.about}</p>
        </div>
        <div id="rest-div">
            {firstName ? <h1>{firstName[0]}’s Restaurants </h1> : "" }
            <section>
                {chefRest.map((rest, index)=>(
                    (index<3) && (
                        <div id="single-div" key={index}>
                            <img src={rest.img} key={index} alt={rest.img} />
                            <div id="single-div-name"><h1>{rest.name}</h1></div>
                        </div>
                    )
                )
                )}
            </section>
        </div>
      </div>

        </>
      )
    }

export default WeekChef;