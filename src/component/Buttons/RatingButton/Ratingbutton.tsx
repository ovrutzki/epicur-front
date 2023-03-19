import { RecordWithTtl } from "dns";
import React, { useState } from "react";
import { IButtons } from "../../../interFaces/interFaces";
import "./RatingButton.css";


const RatingButton: React.FC<IButtons> = (props:IButtons) => {
  const [rating, setRating]:[number, React.Dispatch<React.SetStateAction<number>>] = useState(1)
  const onChangeRatingValue = (e:React.ChangeEvent<HTMLInputElement>): void => {
    const ratingTarget = Number(e.target.value)
    setRating(ratingTarget);
  };
      return (<>
      <div ref={props.refProps} className="rating-popup ">
          <h2>{props.name}</h2>
          <div id={props.name} className="rating-div" >
            <form action="">
            <label><input type="checkbox" value={1} className="checkbox" onChange={onChangeRatingValue} /><img className="stars" src="/image/rating/1.svg" alt="1 star"  /></label>
            <label><input type="checkbox" value={2} className="checkbox" /><img className="stars" src="/image/rating/2.svg" alt="2 star"  /></label>
            <label><input type="checkbox" value={3} className="checkbox" /><img className="stars" src="/image/rating/3.svg" alt="3 star"  /></label>
            <label><input type="checkbox" value={4} className="checkbox" /><img className="stars" src="/image/rating/4.svg" alt="4 star"  /></label>
            <label><input type="checkbox" value={5} className="checkbox" /><img className="stars" src="/image/rating/5.svg" alt="5 star"  /></label>
            </form>
          </div>
        </div>

        </>
      )
    }

export default RatingButton;