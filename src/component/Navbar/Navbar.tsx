import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../GeneralStyle.css";
import "./navStyle.css";
import "../../fonts/helvetica/HelveticaNeue.ttf";
import { NavLink } from "react-router-dom";
import CartPopUp from "../CartapopUp/CartPopUp";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../../store/store/store";
import {IoMdMenu} from "react-icons/io"
import {AiOutlineClose} from 'react-icons/ai'
import MobileMenu from "./MobileMenu/MobileMenu";
import { getUserData } from "../../store/slicer/userSlicre";
const Navbar: React.FC = () => {
  const dispatch = useDispatch();

  const navigate: any = useNavigate();
  const [openCartModal, setOpenCartModal] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false)
  const dishesInCart =  useSelector((state: IRootState) => state.order.value);
  const amountInCart = dishesInCart && dishesInCart.length;
    const userSelector = useSelector((state: IRootState) => state.user.userInfo);
    const userDataString = (sessionStorage.getItem('user-logged-in'));
    const userDataObj =userDataString && JSON.parse(userDataString)
    const [userName, setUserName] = useState<string | undefined>("Guest")

    useEffect(()=>{
      dispatch(getUserData(userDataObj));
    },[])
  // close the cart pop up
  let cartRef = useRef<HTMLElement>();
  let cartButtonRef: any = useRef();
  useEffect(() => {
    let handler = (event: any) => {
      if (
        !cartRef?.current?.contains(event.target) &&
        !cartButtonRef?.current?.contains(event.target)
      ) {
        setOpenCartModal(false);
      }
    };
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  //mobile nav bar
  const hamburgerIcon = <IoMdMenu onClick={() => setOpenMenu(!openMenu)} className="hamburger" size='40px' />
  const closeIcon = <AiOutlineClose onClick={() => setOpenMenu(!openMenu)} className="hamburger" size='30px' />

  useEffect(() =>{
    setUserName(userSelector?.first);
  },[userName])

  return (
    <>
      <nav>
        {openMenu ? closeIcon : hamburgerIcon }
        {openMenu && <MobileMenu />}
        <button className="symbol" onClick={() => navigate("/")}>
            <img src="/image/logo.svg" alt="" />
          </button>
        <div id="left-nav">
          <button onClick={() => navigate("/")}>
            <img src="/image/logo.svg" alt="" />
            EPICURE
          </button>
          <NavLink
            to="/restaurant"
            className={({ isActive }) =>
              isActive ? "underline" : "not-active"
            }
          >
            Restaurant
          </NavLink>
          <NavLink
            to="/chefs"
            className={({ isActive }) =>
              isActive ? "underline" : "not-active"
            }
          >
            Chefs
          </NavLink>
        </div>
        <div id="right-nav">
          <div id="user-name">Hello {userName ? userName : "Guest"}</div>
          <div id="search">
            <input type="text" placeholder="Search for restaurant, Chefs" />
          </div>
          <button onClick={() => navigate("/log-in")}>
            <img src="/image/person.svg" alt="" />
          </button>
          <button
            ref={cartButtonRef}
            id="shopping-icon"
            onClick={() => setOpenCartModal(!openCartModal)}
          >
            <img src="/image/shopping.svg" alt="" />
            {amountInCart > 0 && <div id="amount-in-cart">{amountInCart}</div>}
          </button>
        </div>
      </nav>
      {openCartModal && <CartPopUp refprops={cartRef} />}
    </>
  );
};

export default Navbar;

