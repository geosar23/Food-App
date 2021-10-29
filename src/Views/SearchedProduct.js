// import React, { useState } from "react";
// import {Home } from "./Home";

// function SearchedProduct(event,content){
//     //Filtering Products

//     const [searchTerm,setSearchTerm]=useState('')
//     setSearchTerm(event.target.value)

//     content.filter((product)=>{
//         if(searchTerm===''){
//             return product
//         }else if(product.name.toLowerCase().includes(searchTerm.toLowerCase())){
//             return product
//         }

//     }).map((product,key)=>{
//         return(
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
//                 {content}
//             </div>
//         )
//     })
    
// }

// export default SearchedProduct