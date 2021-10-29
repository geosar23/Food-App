import React ,{useEffect, useState} from "react";
import axios from 'axios'
import Loading from "../Components/Loading";
import ProductCard from "../Components/ProductCard";

function Home(){
    //Fetched Products and listed at Home View

    const [requestError,setError]=useState()
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
    const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/products`

    const [products,setProducts]=useState({
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

    
    useEffect(()=>{
        setProducts({
            loading:true,  
            data:null,
            error:false,
        })
        axios.get(url)
            .then(response=>{
                setProducts({
                    loading:false,
                    data:response.data,
                    error:false,
                })
            })
            .catch(err=>{
                setError(err)
                setProducts({
                    loading:false,
                    data:null,
                    error:true,
                })
            })
    },[url])

    let content=null
   

    if(products.error){
        content=<h1 className="text-center text-3xl bold text-red-500 content-center">Error:{requestError.message} please refresh</h1>
    }

    if(products.loading){
        content=<Loading/>
    }

    if(products.data){
        content= products.data.map((product)=>
            <div key={product.id}>
                <ProductCard product={product}/>
            </div>
        )
    }





    return(
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {content}
        </div>
        
    )
}

export default Home 