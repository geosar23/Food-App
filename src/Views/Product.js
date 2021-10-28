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

    const [requestError,setError]=useState()
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
    const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/products`

    const {id}=useParams()//returns all of url parameters and we get just the id through destr..
    const [product,setProduct]=useState({
        loading:false,
        data:null,
        error:false,
    })

    //Token authorization
    axios.interceptors.request.use(
        config=>{
            config.headers.authorization=`Bearer ${accessToken}`
            return config
        },
        error=>{
            return Promise.reject(error)
        }
    )

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
                        :{product.data.albumId}
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