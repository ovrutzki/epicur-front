import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const pushingRestToBackend = async (values: AllInOne) => {
  const id = values.id;
  const name = values.name;
  const chef = values.chef;
  const chefId = Number(values.chefId);
  const img = values.img;
  const rating = `/image/rating/${values.rating}.svg`;
  const address = values.address?.split(",").map(Number);
  const openHours = values.openHours?.split(",").map(Number);
  const openDays = values.openDays?.split(",").map(Number);
  const openYear = Number(values.openYear);
  const dishes = values.dishes?.split(",").map(Number);

  try {
    const addingRest = await axios.post(
      "https://eran-epicure-project-back.onrender.com//api/restaurants/adding",
      {
        id: id,
        name: name,
        address: address,
        chef: chef,
        chefId: chefId,
        openHours: openHours,
        openDays: openDays,
        openYear: openYear,
        img: img,
        dishes: dishes,
        rating: rating,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("restaurant added");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
