import React ,{useEffect, useState} from "react";
import axios from 'axios'
import { useParams } from "react-router";

function Product(){

    // const config = {
    //     headers: { Authorization: `Bearer ${token}` }
    // };
    
    // const bodyParameters = {
    //    key: "value"
    // };
    
    // Axios.post( 
    //   'http://localhost:8000/api/v1/get_token_payloads',
    //   bodyParameters,
    //   config
    // ).then(console.log).catch(console.log);

    const {id}=useParams()//returns all of url parameters and we get just the id through destr..
    const url=`https://jsonplaceholder.typicode.com/photos/${id}`
    const [product,setProduct]=useState(null) 

    let content=null

    useEffect(()=>{
        axios.get(url)
            .then(response=>{
            setProduct(response.data)
            })
    },[url])

    if(product){
        content= <div>
                    <h1 className="text-2xl font-bold mb-3">
                        {product.title}
                    </h1>
                    <div>
                        <img
                            src={product.thumbnailUrl}
                            alt={product.title}
                        />
                    </div>
                    <div className="font-bold text-xl mb-3">
                        Album Id:{product.albumId}
                    </div>
                    <div>
                        Id:{product.id}
                    </div>
                </div>
    }

    return(
        <div>
            {content}
        </div>
    )

    
}

export default Product