import React from "react";


function ProductCard(props){
    return(
        <div className="border-4 border-gray-100 text-gray-800 m-7 rounded-lg overflow-hidden hover:border-gray-800">
            {/* <div style={{'backgroundImage':`url('${props.product.image}')`,}} className="object-scale-down h-48 w-full bg-blue bg-cover"></div> */}
            <img className="w-full" alt="" src={props.product.image}></img>
            <div className="p-3">
                <h3 className="text-center font-bold text-xl-mb-3">
                    {props.product.name}
                </h3>
                <div className="text-center text-yellow-400 font-bold mb-3">
                    {props.product.price}€
                </div>
                <div className="text-center mb-3 italic">
                    {props.product.description}
                </div>
            </div>
           

        </div>
    )
}

export default ProductCard