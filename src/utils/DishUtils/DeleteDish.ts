import axios from "axios";

 export const deleteDish = async (dishId: number) => {
    try {
      const deleteItem = await axios.delete("http://localhost:8000/api/dishes/delete/oneDish", {
        data: {
          _id: dishId,
        },
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      });
      alert("dish deleted ");
    } catch (error: any) {
      alert(error.message);
      console.log(error);
    }
  };