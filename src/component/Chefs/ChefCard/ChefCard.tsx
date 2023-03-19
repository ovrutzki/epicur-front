import React from "react";
import "./ChefCard.css";
import { IChefCard } from "../../../interFaces/interFaces";
import {useSelector} from "react-redux"
import { IRootState } from "../../../store/store/store";
import { useNavigate } from "react-router-dom";

const ChefCard: React.FC = () => {
  const chefsArray = useSelector(
    (state:IRootState) => state.chefs.value
  )
  const navigate = useNavigate();
  const onCardClick = (navigatePath?: string) => {
    navigate(navigatePath ? navigatePath : "");
  };
  return (
    <>
      <div  id="main-chef">
        {chefsArray.map((chef: IChefCard, index: number) => (
          <section key={index*401} id="chef-section" onClick={() => onCardClick(`${chef.id}`)}>
            <img src={chef.img}  alt={chef.name} />
            <h1>{chef.name}</h1>
          </section>
        ))}
      </div>
    </>
  );
};

export default ChefCard;
