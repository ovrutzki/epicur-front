import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const pushingChefToBackend = async (values: AllInOne) => {
  const id = values.id;
  const name = values.name;
  const restaurant = values.restaurant?.split(",").map(Number);
  const age = values.age;
  const img = values.img;
  const about = values.about;

  try {
    const addingChef = await axios.post(
      "https://eran-epicure-project-back.onrender.com/api/chefs/adding",
      {
        id: id,
        name: name,
        restaurant: restaurant,
        age: age,
        img: img,
        about: about,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
          "Content-Type": "application/json",
        },
      }
    );
    alert("chef added");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
  window.location.reload()

};
