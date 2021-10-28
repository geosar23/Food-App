import React from "react";
import {Link} from 'react-router-dom'

function ProductCard(props){
    return(
        <div className="border mb-4 rounded overflow-hidden">
            <Link to={`/products/${props}/${props.product.id}`}>
                <div style={{'backgroundImage':`url('${props.product.image}')`,}} className="w-full h-64 bg-blue bg-cover"></div>
                {props.product.name}
                {props.product.price}
            </Link>
        </div>
    )
}

export default ProductCard