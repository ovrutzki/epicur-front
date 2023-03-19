import React, { ReactNode, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { IChefCard } from "../../interFaces/interFaces";
import {
  IChefs,
  IDishes,
  IDishState,
  IRestaurants,
  IRootState,
} from "../../store/store/store";
import { deleteChef } from "../../utils//ChefUtils/DeletChef";
import { deleteDish } from "../../utils//DishUtils/DeleteDish";
import {
  deleteRestaurant,
  deleteRestaurantDishes,
} from "../../utils/RestaurantUtils/DeleteRestaurant";
import FilterButtons from "../Buttons/FilterButtons/Buttons";
import Filter from "../Filter/Filter";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";

import "./AdminSystem.css";
import EditingData from "./EditingData/EditingData";

const AdminSystem: React.FC = () => {
  const navigate = useNavigate();

  const [openEditor, setOpenEditor] = useState<number>();
  const [openAdding, setOpenAdding] = useState<boolean>(false);
  const dishesArray = useSelector(
    (state: IRootState) => state.dishes.allDishes
  );
  const chefsArray = useSelector((state: IRootState) => state.chefs.value);
  const restaurantsArray = useSelector(
    (state: IRootState) => state.restaurants.default
  );
  let detailsModalRef: any = useRef();
  useEffect(() => {
    let handler = (event: any) => {
      if (!detailsModalRef?.current?.contains(event.target)) {
        setOpenAdding(false);
        setOpenEditor(-2);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  const closeModal = () => {
    setOpenAdding(false);
    setOpenEditor(-2);
  };
  const [collection, setCollection] = useState<string>("");

  const handelDeleteRestaurant = (
    rest_id: any,
    restId: number,
    restName: string
  ) => {
    let userInput = prompt(
      "deleting this restaurant will delete all its dishes. to approve enter the restaurant name:"
    );
    if (restName.toLocaleLowerCase() === userInput?.toLocaleLowerCase()) {
      deleteRestaurantDishes(restId);
      deleteRestaurant(rest_id);
    } else {
      alert("try again");
    }
  };
  const handelDeleteChef = (chefId: number, chefName: string) => {
    let userInput = prompt(
      "Are you sure you want to delete this Chef?. to approve enter the chef name:"
    );
    if (chefName.toLocaleLowerCase() === userInput?.toLocaleLowerCase()) {
      deleteChef(chefId);
    } else {
      alert("try again");
    }
  };
  const handelDeleteDish = (dishId: number, dishName: string) => {
    let userInput = prompt(
      "Are you sure you want to delete this Chef?. to approve enter the chef name:"
    );
    if (dishName.toLocaleLowerCase() === userInput?.toLocaleLowerCase()) {
      deleteDish(dishId);
    } else {
      alert("try again");
    }
  };
  const userLogged = sessionStorage.getItem("user-logged-in")


  return (
    <>
      <Navbar />
        {userLogged?.includes('admin' || "chef")? 
      <div id="admin-container">
        <div id="filter-div">
          <FilterButtons name="Chefs" onClick={() => setCollection("Chefs")} />
          <FilterButtons
            name="Restaurants"
            onClick={() => setCollection("Restaurants")}
          />
          <FilterButtons
            name="Dishes"
            onClick={() => setCollection("Dishes")}
          />
        </div>
        {collection === "Chefs" && (
          <div id="chefs-data">
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>RESTAURANTS</th>
                  <th>AGE</th>
                  <th>IMAGE</th>
                  <th>ABOUT</th>
                  <th>DELETE</th>
                  <th>UPDATE</th>
                </tr>
                {chefsArray.map((chef: IChefs, index: number) => {
                  return (
                    <tr key={index * 700}>
                      <td>{chef.id}</td>
                      <td>{chef.name}</td>
                      <td>{chef.restaurant.join(',')}</td>
                      <td>{chef.age}</td>
                      <td>
                        <a href={chef.img}>{chef.img}</a>
                      </td>
                      <td>{chef.about}</td>
                      <td>
                        <img
                          className="delete-btn"
                          src="/image/icons/delete.svg"
                          alt="delete"
                          onClick={() => handelDeleteChef(chef._id, chef.name)}
                        />
                      </td>
                      <td>
                        <img
                          className="edit-btn"
                          src="/image/icons/edit.svg"
                          alt="edit"
                          onClick={() => setOpenEditor(chef.id)}
                        />
                      </td>
                      {openEditor === chef.id && (
                        <EditingData
                          onclose={closeModal}
                          refProps={detailsModalRef}
                          id={chef.id}
                          _id={chef._id}
                          name={chef.name}
                          restaurant={String(chef.restaurant)}
                          age={chef.age}
                          img={chef.img}
                          about={chef.about}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => setOpenAdding(true)}>
              <img src="/image/icons/add-new.png" alt="add new" />
            </button>
            {openAdding && (
              <EditingData
              onclose={closeModal}
                refProps={detailsModalRef}
                id={chefsArray.length + 1}
                name={""}
                restaurant={""}
                age={0}
                img={""}
                about={""}
              />
            )}
          </div>
        )}
        {collection === "Restaurants" && (
          <div id="restaurants-data">
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>ADDRESS</th>
                  <th>CHEF</th>
                  <th>CHEF ID</th>
                  <th>OPENING</th>
                  <th>CLOSING</th>
                  <th>DAYS</th>
                  <th>IMAGE</th>
                  <th>DISHES</th>
                  <th>RATING</th>
                  <th>DELETE</th>
                  <th>UPDATE</th>
                </tr>
                {restaurantsArray.map((rest: IRestaurants, index: number) => {
                  return (
                    <tr key={index * 802}>
                      <td>{rest.id}</td>
                      <td>{rest.name}</td>
                      <td>{rest.address}</td>
                      <td>{rest.chef}</td>
                      <td>{rest.chefId}</td>
                      <td>{rest.openHours[0]}</td>
                      <td>{rest.openHours[1]}</td>
                      <td>{rest.openDays.join(",")}</td>
                      <td>
                        <a href={rest.img}>{rest.img}</a>
                      </td>
                      <td>
                        {dishesArray
                          .filter((dish) => dish.restaurantId === rest.id)
                          .map((dish) => `${dish.id},`)}
                      </td>
                      <td>{"★".repeat(Number(rest.rating.split("")[14]))}</td>
                      <td>
                        <img
                          className="delete-btn"
                          src="/image/icons/delete.svg"
                          alt="delete"
                          onClick={() =>
                            handelDeleteRestaurant(rest._id, rest.id, rest.name)
                          }
                        />
                      </td>
                      <td>
                        <img
                          className="edit-btn"
                          src="/image/icons/edit.svg"
                          alt="edit"
                          onClick={() => setOpenEditor(rest.id)}
                        />
                      </td>
                      {openEditor === rest.id && (
                        <EditingData
                        onclose={closeModal}
                          refProps={detailsModalRef}
                          id={rest.id}
                          _id={rest._id}
                          name={rest.name}
                          address={String(rest.address)}
                          chef={rest.chef}
                          chefId={rest.chefId}
                          openHours={String(rest.openHours)}
                          openDays={String(rest.openDays)}
                          img={rest.img}
                          dishes={dishesArray
                            .filter((dish) => dish.restaurantId === rest.id)
                            .map((dish) => `${dish.id},`)
                            .join(",")}
                          rating={rest.rating.split("")[14]}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => setOpenAdding(true)}>
              <img src="/image/icons/add-new.png" alt="add new" />
            </button>
            {openAdding && (
              <EditingData
              onclose={closeModal}
                refProps={detailsModalRef}
                id={restaurantsArray.length + 1}
                name={""}
                address={""}
                chef={""}
                chefId={0}
                openHours={""}
                openYear={0}
                img={""}
                dishes={""}
                rating={""}
              />
            )}
          </div>
        )}
        {collection === "Dishes" && (
          <div id="dishes-data">
            <table>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>REST ID</th>
                  <th>RATING</th>
                  <th>TIME</th>
                  <th>ABOUT</th>
                  <th>PRICE</th>
                  <th>ALLERGEN</th>
                  <th>ICONS</th>
                  <th>SIDES</th>
                  <th>CHANGES</th>
                  <th>IMAGE</th>
                  <th>DELETE</th>
                  <th>UPDATE</th>
                </tr>
                {dishesArray.map((dish: IDishes, index: number) => {
                  return (
                    <tr key={index * 904}>
                      <td>{dish.id}</td>
                      <td>{dish.name}</td>
                      <td>{dish.restaurantId}</td>
                      <td>{dish.rating}</td>
                      <td>{dish.time.join(", ")}</td>
                      <td>{dish.about}</td>
                      <td>{dish.price}</td>
                      <td>{dish.allergan}</td>
                      <td>
                        {dish.icons.map((icon, index) => (
                          <img key={index * 111} src={icon} />
                        ))}
                      </td>
                      <td>{dish.sides.join(", ")}</td>
                      <td>{dish.changes.join(", ")}</td>
                      <td>
                        <a href={dish.img}>{dish.img}</a>
                      </td>
                      <td>
                        <img
                          className="delete-btn"
                          src="/image/icons/delete.svg"
                          alt="delete"
                          onClick={() => handelDeleteDish(dish._id, dish.name)}
                        />
                      </td>
                      <td>
                        <img
                        className="edit-btn"
                          src="/image/icons/edit.svg"
                          alt="edit"
                          onClick={() => setOpenEditor(dish.id)}
                        />
                      </td>
                      {openEditor === dish.id && (
                        <EditingData
                        onclose={closeModal}
                          refProps={detailsModalRef}
                          id={dish.id}
                          name={dish.name}
                          restaurantId={dish.restaurantId}
                          rating={dish.rating}
                          _id={dish._id}
                          time={dish.time.join(",")}
                          about={dish.about}
                          price={dish.price}
                          allergan={dish.allergan.join(",")}
                          icons={dish.icons.join(",")}
                          sides={dish.sides.join(",")}
                          changes={dish.changes.join(",")}
                          img={dish.img}
                        />
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <button onClick={() => setOpenAdding(true)}>
              <img src="/image/icons/add-new.png" alt="add new" />
            </button>
            {openAdding && (
              <EditingData
              onclose={closeModal}
                refProps={detailsModalRef}
                id={dishesArray.length + 1}
                name={""}
                restaurantId={0}
                rating={""}
                time={"breakfast,lunch,dinner"}
                about={""}
                price={0}
                allergan={""}
                icons={
                  "/image/spicy-small.svg,/image/vegan-small.svg,/image/vegetarian-small.svg"
                }
                sides={""}
                changes={""}
                img={""}
              />
            )}
          </div>
        )}
      </div>
         : <h1>you don`t have permission for this page</h1>}

      <Footer />
    </>
  );
};

export default AdminSystem;
