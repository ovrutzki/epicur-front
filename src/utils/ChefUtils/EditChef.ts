import axios from "axios";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../store/store/store";

type Props = IRestaurants | IDishes | IChefs;
export const editExistingChef = async (values: AllInOne) => {
  const id = values.id;
  const name = values.name;
  const restaurant = values.restaurant?.split(",").map(Number);
  const age = values.age;
  const img = values.img;
  const about = values.about;
  const _id = values._id;

  try {
    const addingChef = await axios.post(
      "http://localhost:8000/api/chefs/edit",
      {
          id: id,
          name: name,
          restaurant: restaurant,
          age: age,
          img: img,
          about: about,
          _id: _id,
        },
        {headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user-token")}`
        }
      }
    );
    alert("details update");
  } catch (err: any) {
    console.log(err.response.data);
    alert(err.response.data);
  }
};
