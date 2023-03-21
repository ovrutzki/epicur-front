import axios from "axios";

export const deleteChef = async (chefId: number) => {
  try {
    const deleteItem = await axios.delete(
      "https://eran-epicure-project-back.onrender.com/api/chefs",
      {
        data: {
          _id: chefId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("chef deleted ");
  } catch (error: any) {
    alert(error.message);
    console.log(error);
  }
  window.location.reload()

};
