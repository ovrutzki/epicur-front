import { Dispatch, SetStateAction, useState, useEffect, useRef } from "react";
import { IButtons } from "../../../interFaces/interFaces";
import DistanceButton from "../DistanceButton/DistanceButtons";
import { PriceButton } from "../PriceButtons/PriceButtons";
import RatingButton from "../RatingButton/Ratingbutton";
import "./FilterContainer.css"
const FilterContainer: React.FC<IButtons> = () =>{
 const [addPrice, setAddPrice]:[boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
 const [addDistance, setAddDistance]:[boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
 const [addRating, setAddRating]:[boolean, Dispatch<SetStateAction<boolean>>] = useState(false)
 const [specificRef,setSpecificRef]:any = useState()
    const openRang = (refSet:any, x:Dispatch<SetStateAction<boolean>>,y:Dispatch<SetStateAction<boolean>>,z:Dispatch<SetStateAction<boolean>>):void=>{
      x(true)
      y(false)
      z(false)
      setSpecificRef(refSet)
    }
    let priceRef= useRef<HTMLElement>()
    let distanceRef = useRef<HTMLElement>()
    let ratingRef = useRef<HTMLElement>()

    useEffect(()=>{
        let handler = (event:any) =>{
            if(!specificRef?.current?.contains(event.target)){
              setAddPrice(false)
              setAddDistance(false)
              setAddRating(false)
            }
        }
        document.addEventListener("mousedown",handler)

        return () => {
          document.removeEventListener("mousedown",handler)
        }
    })
    return (
      <>
      <div className="after-open">
        <button id="price" className="open-sort" onClick={()=>openRang(priceRef, setAddPrice,setAddDistance,setAddRating)}><h1>Price Range</h1><img src="/image/icons/down arrow.svg" alt="down arrow" /></button>
        {addPrice && <PriceButton refProps={priceRef} name="Price Range"/>}
      </div>
      <div className="after-open">
        <button id="distance" className="open-sort" onClick={()=>openRang(distanceRef,setAddDistance,setAddRating,setAddPrice)}><h1>Distance</h1><img src="/image/icons/down arrow.svg" alt="down arrow" /></button>
        {addDistance && <DistanceButton refProps={distanceRef} name="Distance" />}
      </div>
      <div className="after-open">
        <button id="rating" className="open-sort" onClick={()=>openRang(ratingRef, setAddRating,setAddPrice,setAddDistance)}><h1>Rating</h1><img src="/image/icons/down arrow.svg" alt="down arrow" /></button>
        {addRating && <RatingButton refProps={ratingRef} name={"Rating"} />}
      </div>
      </>
    );

}
   
  export default FilterContainer;

