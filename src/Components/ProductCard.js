import React from "react";

function ProductCard(props){
    return(
        <div className="border mb-4 rounded overflow-hidden">
                <div style={{'backgroundImage':`url('${props.product.image}')`,}} className="w-full h-64 bg-blue bg-cover"></div>
                <div className="p-3">
                <h3 className="font-bold text-xl-mb-3">
                    {props.product.name}
                </h3>
                <div className="font-bold mb-3">
                    {props.product.price}€
                </div>
                <div className="mb-3">
                    {props.product.description}
                </div>

            </div>
        </div>
    )
}

export default ProductCard