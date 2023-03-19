import React, { ReactNode, useEffect, useState } from "react";
import { IChefCard } from "../../../interFaces/interFaces";
import {
  AllInOne,
  IChefs,
  IDishes,
  IRestaurants,
} from "../../../store/store/store";
import { pushingChefToBackend } from "../../../utils/ChefUtils/AddingChef";
import { editExistingChef } from "../../../utils/ChefUtils/EditChef";
import { pushingDishToBackend } from "../../../utils/DishUtils/addingDish";
import { editExistingDish } from "../../../utils/DishUtils/EditDish";
import { pushingRestToBackend } from "../../../utils/RestaurantUtils/AddingRestaurant";
import { editExistingRestaurant } from "../../../utils/RestaurantUtils/EditRestaurant";

import "./EditingData.css";

type Props = IRestaurants | IDishes | IChefs;

const EditingData: React.FC<AllInOne> = (props: AllInOne) => {
  const [values, setValues] = useState<AllInOne>(props);

  useEffect(() => {}, []);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handelSubmit = () => {
    if (values._id) {
      if (values.openHours) {
        editExistingRestaurant(values)
      } else if (values.price) {
        editExistingDish(values)
      } else if (values.restaurant) {
        editExistingChef(values)
      }
    } else  {
      if (values.openHours) {
        pushingRestToBackend(values);
      } else if (values.price) {
        pushingDishToBackend(values);
      } else if (values.restaurant) {
        pushingChefToBackend(values);
      }
    }
    props.onclose();
  };
  
  return (
    <>
      <div id="edit-container">
        <div ref={props.refProps} id="edit-modal">
          <h1>Add or Update your details</h1>
          <form>
            {Object.keys(props).filter((prop) => prop != "_id" && prop != "refProps" && prop != "onclose").map((propName) => (
              <label key={propName}>
                {propName}
                <input
                  onChange={handleChange}
                  type="text"
                  name={propName}
                  value={values[propName as keyof Props] || ""}
                />
              </label>
            ))}
          </form>
          <button id="submit-btn" onClick={handelSubmit}>
            SUBMIT CHANGES
          </button>
        </div>
      </div>
    </>
  );
};

export default EditingData;
