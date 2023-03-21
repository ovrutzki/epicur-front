import axios from "axios";

export const deleteRestaurant = async (restId: number) => {
  try {
    const deleteItem = await axios.delete(
      "https://eran-epicure-project-back.onrender.com/api/restaurants",
      {
        data: {
          _id: restId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("delete ");
  } catch (error: any) {
    alert(error.message);
    console.log(error);
  }
};

export const deleteRestaurantDishes = async (restId: number) => {
  try {
    const deleteItem = await axios.delete(
      "https://eran-epicure-project-back.onrender.com/api/dishes/delete/restaurant-dishes",
      {
        data: {
          restaurantId: restId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("dishes delete");
  } catch (error: any) {
    alert(error.message);
    console.log(error);
  }
  window.location.reload()

};
