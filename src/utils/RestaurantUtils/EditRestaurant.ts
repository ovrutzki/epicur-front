import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const editExistingRestaurant = async (values: AllInOne) => {
  const id = values.id;
  const name = values.name;
  const address = values.address?.split(",").map(Number);
  const chef = values.chef;
  const chefId = Number(values.chefId);
  const openHours = values.openHours?.split(",").map(Number);
  const openDays = values.openDays?.split(",").map(Number);
  const openYear = Number(values.openYear);
  const img = values.img;
  const rating = `/image/rating/${values.rating}.svg`;
  const dishes = values.dishes?.split(",").map(Number);
  const _id = values._id;

  try {
    const addingChef = await axios.post(
      "https://eran-epicure-project-back.onrender.com/api/restaurants/edit",
      {
        id: id,
        name: name,
        address: address,
        rating: rating,
        chef: chef,
        chefId: chefId,
        openHours: openHours,
        openDays: openDays,
        openYear: openYear,
        dishes: dishes,
        img: img,
        _id: _id,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("restaurant details update");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
