import React from "react";
import { ICard, IRenderRest } from "../../../interFaces/interFaces";
import Card from "../../Card/Card";
import { useSelector } from "react-redux";
import { IRootState } from "../../../store/store/store";
import "./RenderRest.css"

const RenderRest: any = (props: IRenderRest) => {
  const filteredRest = useSelector((state: IRootState) => state.restaurants.value);
  return (
    <>
      <div id="restaurant">
        {filteredRest.map((card: ICard, index: number) => (
            <Card
              class={card.price ? "dish" : "rest"}
              key={index}
              img={card.img}
              name={card.name}
              icons={card.icons}
              about={card.about}
              price={card.price}
              chef={card.chef}
              rating={card.rating}
              navigatePath={`${card.id}`}
            />
        ))}
      </div>
    </>
  );
};

export default RenderRest;

