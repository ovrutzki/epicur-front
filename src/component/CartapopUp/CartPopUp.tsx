import axios from "axios";
import React, { HtmlHTMLAttributes, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefactorActionInfo } from "typescript";
import { deleteFromCart, getCartFromDb } from "../../store/slicer/orderSlicer";
import { IOrderState, IRootState } from "../../store/store/store";
import "./CartPopUp.css";

export interface ICartModal {
  refprops: any;
}

const CartPopUp: React.FC<ICartModal> = (props: ICartModal) => {
  const dispatch = useDispatch();
  const dishesInCartArray = useSelector(
    (state: IRootState) => state.order.value
  );
  const checkoutPrice = useSelector(
    (state: IRootState) => state.order.checkoutPrice
  );
  const userSelector = useSelector((state: IRootState) => state.user.userInfo);
  const userDataString = sessionStorage.getItem("user-logged-in");
  const userDataObj = userDataString && JSON.parse(userDataString);
  const [dishesInCart, setDishesInCart] = useState(dishesInCartArray);
  const [flag, setFlag] = useState<boolean>(false);
  const userCart = async () => {
    try {
      const getUserCart = await axios.get(
        "https://eran-epicure-project-back.onrender.com/api/users/getCart",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
      dispatch(getCartFromDb(getUserCart.data));
      setFlag(true);
      return getUserCart;
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("user-token")) {
      userCart();
      setDishesInCart(dishesInCartArray);
    }
  }, [flag]);

  const [checkOut, setCheckOut] = useState(0);
  useEffect(() => {
    setCheckOut(checkOut + checkoutPrice);
  }, []);

  return (
    <div ref={props.refprops} id="cart-container">
      <h1>YOUR ORDER</h1>
      {userDataObj ? <h1>{userDataObj.first}</h1> : <h1>Guest</h1>}
      {dishesInCart[0] ? (
        <>
          <h2>{dishesInCart[0].restaurantName}</h2>
          <div id="dish-in-cart">
            {dishesInCart.map((dish: IOrderState, index: number) => {
              return (
                <div key={index} id="single-dish">
                  <img src={dish.img} alt={dish.name} />
                  <div id="mid-div">
                    <div id="mid-up">
                      <div id="amount">{dish.quantity}</div>
                      <div id="dish-name">
                        <h3>{dish.name}</h3>
                        <p>₪{dish.totalPrice}.00</p>
                      </div>
                    </div>
                    <div id="mid-down">
                      {dish.info &&
                        dish.info.map(
                          (info: string) =>
                            info !== "" && (
                              <>
                                <p>{info}</p>
                                <hr />
                              </>
                            )
                        )}
                    </div>
                  </div>
                  <div id="right-div">
                    <button
                      onClick={() => dispatch(deleteFromCart(dish.dishId))}
                      id="delete"
                    >
                      X
                    </button>
                    <p>₪{dish.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <hr id="mid-hr" />
          <div id="cart-input">
            <h3>Add A Comment</h3>
            <textarea placeholder="Special requests, allergies, deary restrictions, etc."></textarea>
          </div>
        </>
      ) : (
        <img src="/image/icons/empty bag.svg" />
      )}
      <div id="btn-div">
        <button id="checkout-btn">CHECKOUT ₪{checkOut}</button>
        <button id="history-btn">ORDER HISTORY</button>
      </div>
    </div>
  );
};

export default CartPopUp;
