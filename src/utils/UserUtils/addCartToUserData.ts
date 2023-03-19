import axios from "axios";
import { IOrderState } from "../../store/store/store";

export const addCartToUserData = async (dishToCart: IOrderState) => {
  const id = dishToCart.dishId;
  const restaurantId = dishToCart?.restaurantId;
  const price = dishToCart?.price;
  const totalPrice = dishToCart.totalPrice;
  const quantity = dishToCart.quantity;
  const info = dishToCart.info;
  const restaurantName = dishToCart.restaurantName;
  const img = dishToCart.img;
  const name = dishToCart.name;
  try {
    const addingDish = await axios.post(
      "https://eran-epicure-project-back.onrender.com//api/users/addDish",
      {
        dishId: id,
        restaurantId: restaurantId,
        price: price,
        totalPrice: totalPrice,
        quantity: quantity,
        info: info,
        img: img,
        name: name,
        restaurantName: restaurantName,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
