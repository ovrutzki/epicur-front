import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const pushingDishToBackend = async (values: AllInOne) => {
  const id = values.id;
  const name = values.name;
  const restaurantId = Number(values.restaurantId);
  const rating = `/image/rating/${values.rating}.svg`;
  const time = values.time;
  const about = values.about;
  const price = Number(values.price);
  const allergan = values.allergan;
  const icons = values.icons;
  const sides = values.sides;
  const changes = values.changes;
  const img = values.img;

  try {
    const addingDish = await axios.post(
      "https://eran-epicure-project-back.onrender.com/api/dishes/adding",
      {
        id: id,
        name: name,
        restaurantId: restaurantId,
        rating: rating,
        time: time,
        about: about,
        price: price,
        allergan: allergan,
        icons: icons,
        sides: sides,
        changes: changes,
        img: img,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("dish added");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
