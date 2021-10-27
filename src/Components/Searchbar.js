import React from "react";

function Searchbar(){
    return(
        <div className="shadow flex">
            <input className="w-full rounded p-2" type="text" placeholder="Search..."/>
            <button className="bg-white w-auto flex justify-end items-center text-black-500 p-2 hover:text-blue-400">
                <i className="material-icons">search</i>
            </button>
            
        </div> 
    )
}

export default Searchbar