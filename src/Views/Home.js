import React, { useState } from "react";
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";

function Home({displayList, setDisplayList, error, isLoading}){

    const [forceRerender,setForceRerender]=useState()

    function showError(){
        if(error){
            return <h1 className="text-center text-3xl bold text-red-500 content-center">Error:{error.message} please refresh</h1>
        }
    }

    function showLoading(){
        if(isLoading){
            return <Loading/>
        }
    }

    function sortList(order){
        const sortedDisplayList = displayList.sort((a,b)=>{
            return order === 1 ? a.price-b.price : b.price-a.price
        })
        setDisplayList(sortedDisplayList)
        setForceRerender(!forceRerender)  //displayList wasnt updating, so I force a rerender by adding a state in my component
    }

    
    return(
        <div className="content-center">
            <div className="text-center">
                <button className="bg-blue-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l" onClick={()=>sortList(1)}>Price Ascending ↑</button>
                <button className="bg-blue-200 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r" onClick={()=>sortList(-1)}>Price Descending ↓</button>
           </div>
            {showError()}
            {showLoading()}
            <div className="grid z:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-5 gap 2">
                {
                    displayList.map((item)=>{
                        return(
                            <ProductCard key={item.id} product={item}/>
                        )
                    })
                }
            </div>
        </div>
        
    )
}

export default Home 