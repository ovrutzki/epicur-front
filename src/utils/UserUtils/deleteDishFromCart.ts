import axios from "axios";



export const deleteFromCartDB = async (dishId: number) => {
    const userDataString = (sessionStorage.getItem('user-logged-in'));
    const userDataObj =userDataString && JSON.parse(userDataString)
        try {
      const deleteItem = await axios.delete(
        "https://eran-epicure-project-back.onrender.com/api/users/delete/cartDish",
        {
          data: {
            dishId: dishId,
            user: userDataObj.email
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