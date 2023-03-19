
import React from "react";
import "./Icons.css";


const Icons: React.FC = () => {
      return (<>
                <div id="icons-main">
                    <h1>THE MEANING OF OUR ICONS:</h1>
                    <div id="icons">
                        <section>
                        <img src="/image/SpicyBig.svg" alt="Spicy" />
                        <h2>Spicy</h2>
                        </section>
                        <section>
                        <img src="/image/VegetarianBig.svg" alt="Vegetarian" />
                        <h2>Vegetarian</h2>
                        </section>
                        <section>
                        <img src="/image/VeganBig.svg" alt="Vegan" />
                        <h2>Vegan</h2>
                        </section>
                    </div>
                </div>
        </>
      )
    }

export default Icons;