import React, { useState } from "react";
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";

function Home({displayList, setDisplayList, error, isLoading}){

    const [forceRerender,setForceRerender]=useState() //

    function showError(){
        console.log(error)
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
            console.log(a.price)
            return order === 1 ? a.price-b.price : b.price-a.price
        })
        setDisplayList(sortedDisplayList)
        setForceRerender(!forceRerender)  //displayList wasnt updating, so I force a rerender by adding a state in my component
        console.log(sortedDisplayList)
    }

    
    return(
        <div>
            <button onClick={()=>sortList(1)}>Price Ascending</button>
            <button onClick={()=>sortList(-1)}>Price Descending</button>
            {showError()}
            {showLoading()}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {console.log(displayList)}
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