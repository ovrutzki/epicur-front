import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./SignIn.css";

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phone, setPhone] = useState<string>();
  const [password, setPassword]: any = useState("");
  const [black, setBlack] = useState<string>("");

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    if (
      password != "" &&
      email != "" &&
      firstName != "" &&
      lastName != "" &&
      address != "" &&
      phone != ""
    ) {
      setBlack("black-style");
    } else {
      setBlack("");
    }
  }, [email, password, firstName, lastName, address, phone]);
  const registerUser = async (
    first: string,
    last: string,
    address: string,
    phone: string | undefined,
    email: string,
    password: string
  ) => {
    try {
      const userRegisterData = await axios.post(
        "http://localhost:8000/api/users/register",
        {
          first: first,
          last: last,
          address: address,
          phone: phone,
          email: email,
          password: password,
          role:"user"
        }
      );
      successfullyRegister()
    } catch (err: any) {
      if (err.response.status === 400) {
        console.log(err.response.data);
        alert(err.response.data);
      } else if (err.response.status === 409){
        console.log(err.response.data);
        alert(err.response.data);
        navigate("/log-in");
      }
    }
  };

  const handleRegister = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    registerUser(firstName, lastName, address, phone, email, password);
  };

  const navigateFunction = () => {
    navigate("/log-in");
    setGreeting(false);
  };
  const successfullyRegister = () => {
    setGreeting(true);
    setTimeout(navigateFunction, 3000);
  };
  return (
    <>
      <Navbar />
      
      <div id="sign-container">
        <div id="sign-main">
        {greeting ? <h1>hello {firstName}, Please log-in now</h1> : 
        <>
        <div id="sign-title">
          <h1>Sign Up</h1>
          <h2>Please enter your details</h2>
        </div>
        <form id="sign-details" action="">
          <label htmlFor="">First Name</label>
          <input
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="first-name"
            placeholder="Enter Your First Name"
          />
          <label htmlFor="">Last Name</label>
          <input
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="last-name"
            placeholder="Enter Your Last Name"
          />
          <label htmlFor="">Address</label>
          <input
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="Address"
            placeholder="Enter Your Address"
          />
          <label htmlFor="">Phone</label>
          <input
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            name="phone"
            placeholder="Enter Your Phone Number"
          />
          <label htmlFor="">Email</label>
          <input
            onChange={emailOnChange}
            type="text"
            name="email"
            placeholder="Email address"
          />
          <label htmlFor="">Password</label>
          <input
            onChange={passwordOnChange}
            type="password"
            name="password"
            placeholder="Password"
          />
        </form>
        <button onClick={handleRegister} id={black} className="sign-in-btn">
          SIGN UP
        </button>
        <section></section>
        </>
        }
        
      </div>
      </div>
      <Footer />
    </>
  );
};

export default SignIn;
