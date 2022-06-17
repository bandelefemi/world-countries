import React from "react";

export default function Country(props){

    // console.log(props.name)
    return (
        <div className="country-wrapper">
            <div className="country-data">
                <div className="country-info">
                    <div className="flag-bearer">
                        <img src={`${props.flag}`} alt="" />
                    </div>
                    <div className="country-name">
                        {props.name}
                
                    </div>
                    <div>
                        <p>Capital: {props.capital}</p>
                        <p>Languages: {props.languages}</p>
                        <p>Population: {props.population.toLocaleString("en-US")}</p>
                        <p>Currency: {props.currency && props.currency}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}