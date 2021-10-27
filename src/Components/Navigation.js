import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

function Navigation(){
    const[showMenu,setMenu]=useState(false)

    let menu
    let menuMask

    if(showMenu){
        menu=
        <div className="bg-gray-200 fixed bg-white top-0 left-0 w-4/5 h-full shadow">
                Menu
        </div>
    }
    return(
        <nav>
            <span className="text-xl">
                <FontAwesomeIcon 
                    icon={faBars}
                    onClick={()=>setMenu(!showMenu)} //instead of true , i use the opposite of the current state to make a toggle action 
                />
            </span>

            {menu}
        </nav>
    )
}

export default Navigation