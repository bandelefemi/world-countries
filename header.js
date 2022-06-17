import React from "react";

export default function Header(props){

    return (
        <div className="header-wrapper">
            <div className="header-content">
                <h1>World Countries Data</h1>
                <p>Currently, we have {props.num} Countries</p>
            </div>
        </div>
    )
}