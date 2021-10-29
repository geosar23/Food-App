import React from "react";
import SearchedProduct from "../Views/SearchedProduct";

function Searchbar(){
    //SearchBar Component

    return(
        <div className="shadow flex">
            <input className="w-full rounded p-2" onChange={event=>{SearchedProduct(event)}} type="text" placeholder="Search..." />
            <button className="bg-white w-auto flex justify-end items-center text-gray-800 p-2 hover:text-gray-800">
                <i className="material-icons">search</i>
            </button>
            
        </div> 
    )
}

export default Searchbar