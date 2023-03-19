import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./DishModal.css";
import Card from "../Card/Card";
import { IModal } from "../../interFaces/interFaces";
import { useDispatch, useSelector } from "react-redux";
import {  IOrderState, IRootState } from "../../store/store/store";
import { addToCart } from "../../store/slicer/orderSlicer";
import axios from "axios";

const DishModal: React.FC<IModal> = (props: IModal) => {
  const clickedDish = useSelector((state: IRootState) =>
    state.dishes.value.find((dish) => dish.id === props.id)
  );
  const dispatch = useDispatch();
  // adding the user changes
  const [changes, setChanges] = useState<string[]>([]);
  const handleChanges = (event: any) => {
    const option = event.target.value;
    const isChecked = event.target.checked;
    if (isChecked) {
      setChanges([...changes, option]);
    } else {
      setChanges(changes.filter((changes) => changes !== option));
    }
  };
  // adding the user side choice
  const [sideChoice, setSideChoice]: [
    string,
    Dispatch<SetStateAction<string>>
  ] = useState<string>("");
  const handelSides = (event: any) => {
    const option = event.target.value;
    setSideChoice(option);
  };

  const [quantity, setQuantity] = useState(1);
  // const [userDishForCart, setUserDishForCart] = useState()

  const userDishForCart: IOrderState = {
    dbId: clickedDish?._id,
    dishId: clickedDish?.id,
    restaurantId: clickedDish?.restaurantId,
    price: clickedDish?.price,
    totalPrice: clickedDish && clickedDish.price * quantity,
    quantity: quantity,
    info: [...changes, sideChoice],
    img: clickedDish?.img,
    name: clickedDish?.name,
    restaurantName: props.restaurantName,
  };
  const btnFunction = () => {
    dispatch(addToCart(userDishForCart));
    props.onClose();
  };

  

  return (
    <>
      <div id="modal-content">
        <div ref={props.refProps} id="modal">
          <button id="close" onClick={props.onClose}>
            X
          </button>
          <Card
            img={clickedDish?.img}
            name={clickedDish?.name}
            about={clickedDish?.about}
            icons={clickedDish?.icons}
            price={clickedDish?.price}
          />
          <div id="modal-bottom">
            <form>
              <h1>Choose a side</h1>
              {clickedDish?.sides.map((side, index: number) => (
                <label className="check-label" key={index} htmlFor="">
                  <input
                    onChange={handelSides}
                    name="sides"
                    value={side}
                    type="radio"
                    className="radio"
                  />
                  {side}
                </label>
              ))}
            </form>
            <form>
              <h1>Changes</h1>
              {clickedDish?.changes.map((change, index: number) => (
                <label key={index} htmlFor="">
                  <input
                    onChange={handleChanges}
                    value={change}
                    type="checkbox"
                    className="check"
                  />
                  {change}
                </label>
              ))}
            </form>
            <div id="quantity">
              <h1>Quantity</h1>
              <div >
                <button onClick={() => setQuantity((quantity) => quantity - 1)}>
                  <img src="/image/icons/minus.svg" alt="minus" />
                </button>
                <p>{quantity}</p>
                <button onClick={() => setQuantity((quantity) => quantity + 1)}>
                  <img src="/image/icons/plus.svg" alt="plus" />
                </button>
              </div>
            </div>
            <button onClick={btnFunction} id="cart-btn">
              ADD TO CART
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DishModal;
