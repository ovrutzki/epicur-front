import React from "react";
import "./AboutUs.css";

const AboutUs: React.FC = () => {
  return (
    <>
      <div id="main-about">
        <div id="about">
          <h1>about us:</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a lacus
            vel justo fermentum bibendum non eu ipsum. Cras porta malesuada
            eros, eget blandit turpis suscipit at. Vestibulum sed massa in magna
            sodales porta. Vivamus elit urna, dignissim a vestibulum. <br /><br /> Lorem
            ipsum dolor sit amet, consectetur adipiscing elit. In a lacus vel
            justo fermentum bibendum no eu ipsum. Cras porta malesuada eros.
          </p>
          <section>
            <button><img src="/image/icons/appstore.svg" alt="/appstore" /></button>
            <button><img src="/image/icons/googleplay.svg" alt="/googleplay" /></button>
          </section>
        </div>
        <img src="/image/icons/logo-big.svg" alt="logo-big" />
      </div>
    </>
  );
};

export default AboutUs;
