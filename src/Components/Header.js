import React from "react";
import Navigation from "./Navigation";
import Searchbar from "./Searchbar";

function Header(){
    return(
        <header className="m-3 border-b p-4 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">George Saramantis</span>
            <Searchbar/>
            <Navigation/>
        </header>
        
    )
}

export default Header