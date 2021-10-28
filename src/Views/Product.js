import React ,{useEffect, useState} from "react";
import axios from 'axios'
import { useParams } from "react-router";
import Loading from "../Components/Loading";

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
    const [product,setProduct]=useState({
        loading:false,
        data:null,
        error:false,
    })

    let content=null

    useEffect(()=>{
        setProduct({
            loading:true,  
            data:null,
            error:false,
        })
        axios.get(url)
            .then(response=>{
                setProduct({
                    loading:false,
                    data:response.data,
                    error:false,
                })
            })
            .catch(error=>{
                setProduct({
                    loading:false,
                    data:null,
                    error:true,
                })
            })
    },[url])

    if(product.error){
        content=<h1 className="text-6xl bold text-red-500 content-center">Error:{product.data} please refresh</h1>
    }

    if(product.loading){
        content=<Loading/>
    }

    if(product.data){
        content= <div>
                    <h1 className="text-2xl font-bold mb-3">
                        {product.data.title}
                    </h1>
                    <div>
                        <img
                            src={product.data.thumbnailUrl}
                            alt={product.data.title}
                        />
                    </div>
                    <div className="font-bold text-xl mb-3">
                        Album Id:{product.data.albumId}
                    </div>
                    <div>
                        Id:{product.data.id}
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