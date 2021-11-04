import React from 'react'

function Searchbar({setSearchTerm}){
    return(
        <div className="shadow flex max-h-10 mt-2">
                <input 
                    className="context-center w-full rounded p-2" 
                    onChange={e=>{
                        setSearchTerm(e.target.value)
                    }} 
                    type="text" 
                    placeholder="Search..." />
                <button className="bg-white w-auto flex justify-end items-center text-gray-800 p-2 hover:text-gray-800" >
                    <i className="material-icons">search</i>
                </button>
            </div> 
    )
}

export default Searchbar