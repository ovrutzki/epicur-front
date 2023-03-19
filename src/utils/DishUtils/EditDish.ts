import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const editExistingDish = async (values: AllInOne) => {
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
  const _id = values._id;

  try {
    const addingChef = await axios.post(
      "https://eran-epicure-project-back.onrender.com//api/dishes/edit",
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
        _id: _id,
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`,
        },
      }
    );
    alert("dish details update");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
