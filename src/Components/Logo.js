import React from 'react'

function Logo(){

    function reloadPage(){
        window.location.reload(true);
    }

    return(
        <span className="text-gray-800 mt-5 md:text-2xl lg:text-3xl" >
            <button onClick={reloadPage} className="font-bold ">George Saramantis</button>
        </span>
    )
}

export default Logo