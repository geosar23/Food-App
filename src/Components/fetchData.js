import React, {useEffect, useState} from "react";
import axios from "axios";

function useAxiosGet(url){

    //Fetch  

    const [requestError,setError]=useState()
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
    
    const [data,setData]=useState({
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
        setData({
            loading:true,  
            data:null,
            error:false,
        })
        axios.get(url)
            .then(response=>{
                console.log(response)
                setData({
                    loading:false,
                    data:response.data.sort((a, b) => (a.index > b.index) ? 1 : -1),
                    error:false,
                })
            })
            .catch(err=>{
                setError(err)
                setData({
                    loading:false,
                    data:null,
                    error:true,
                })
            })
    },[url])

    return data

}

export default useAxiosGet;