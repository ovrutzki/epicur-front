import React from 'react'
import './heroStyle.css'

const Hero: React.FC = ()=>{

    return(
        <div id='hero'>
            <img id='background-img' src="/image/hero-picture1.svg" alt="" />
            <div id='white-div'>
                <p>Epicure works with the top chef restaurants in Tel Aviv</p>
                <div id='search-div'>
                    <button><img src="/image/search.svg" alt="" /></button>
                    <input type="text" placeholder='Search for restaurant cuisine, chef' />
                </div> 
            </div>
        </div>
    )
}

export default Hero