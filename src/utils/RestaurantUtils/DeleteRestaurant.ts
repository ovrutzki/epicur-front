import axios from "axios";

export const deleteRestaurant = async (restId: number) => {
    try {
      const deleteItem = await axios.delete(
        "http://localhost:8000/api/restaurants",
        {
          data: {
            _id: restId,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
        alert("delete ")
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };
  
  export const deleteRestaurantDishes = async (restId: number) => {
    try {
      const deleteItem = await axios.delete(
        "http://localhost:8000/api/dishes/delete/restaurant-dishes",
        {
          data: {
            restaurantId: restId,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
        alert("dishes delete")
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };