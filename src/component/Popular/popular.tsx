import React, { useState, useEffect } from "react";
import "./Popular.css";
import { ICard } from "../../interFaces/interFaces";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";

const Popular: React.FC<any> = (props:any) => {
  const navigate = useNavigate();
  const kind: ICard[] = props.kind;
  const [popular, setPopular] = useState<ICard[] | []>([]);

  useEffect(() => {
    const popularRestaurant = kind
      .filter((best: ICard) => best.rating?.includes("5"))
      .slice(0, 3);
    setPopular(popularRestaurant);
  }, []);
 
  return (
    <>
      <div className="popular">
        <h1>{props.header}</h1>
        <div className="three-div">
          {popular.map((card: ICard, index: number) => (
            <Card
              class={`card ${card.price ? "dish" : "rest"}`}
              key={index}
              img={card.img}
              name={card.name}
              icons={card.icons}
              about={card.about}
              price={card.price}
              chef={card.chef}
              rating={card.rating}
              navigatePath={`restaurant/${card.id}`}
            />
          ))}
        </div>
        {popular[0]?.chef && (
          <button onClick={() => navigate("/restaurant")}>
            <img src="/image/all-restaurant.svg" alt="arrow" />
          </button>
        )}
      </div>
    </>
  );
};

export default Popular;
