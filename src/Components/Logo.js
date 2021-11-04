import React from 'react'

function Logo(){

    function reloadPage(){
        window.location.reload(true);
    }

    return(
        <span className="sm:text-xl  md:text-3xl font-bold text-gray-800 " >
            <button onClick={reloadPage}>George Saramantis</button>
        </span>
    )
}

export default Logo