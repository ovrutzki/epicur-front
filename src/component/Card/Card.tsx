import React, { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { ICard } from "../../interFaces/interFaces";
import "./Card.css";

const  Card: React.FC <ICard> = (props: ICard) => {
  const navigate = useNavigate();
  const onCardClick = (navigatePath?: string) => {
    navigate(navigatePath ? navigatePath : "");
  };
  return (
    <>
      <div className={props.class} onClick={(e) => props.navigatePath ? onCardClick(props.navigatePath) : props.onClick(e)}>
        {props.img ? <img className="img-rest food" src={props.img}/> : <img className="img-dish food" src={props.img}/>}
        <div className="card-downer-div">
          <h1>{props.name} </h1>
          
          {props.icons ?<section>{ props.icons?.map((source:string, index:number)=> <img className="icon" src={source} key={index} alt="icon" />)}</section> : null}
          
          <p id="about-dish">{props.chef ? props.chef : props.about}</p>
            {props.chef ? <img className="rating" src={props.rating} alt="rating"/> : null}
            {props.price ? <div className="price-div" ><hr /><p>₪{props.price}</p><hr /></div> : null }
        </div>
      </div>
    </>
  );
};

export default  Card;