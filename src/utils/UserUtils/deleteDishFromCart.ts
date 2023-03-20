import axios from "axios";



export const deleteFromCartDB = async (dishId: number) => {
    try {
      const deleteItem = await axios.delete(
        "https://eran-epicure-project-back.onrender.com/api/users/delete/cartDish",
        {
          data: {
            dishId: dishId,
          },
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          },
        }
      );
      alert("dish deleted from cart");
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  }