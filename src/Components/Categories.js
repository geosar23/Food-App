import {React , useState , useEffect} from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import Loading from "./Loading";

function Categories(props){

    //const {id , name , index}=useParams()
    const [requestError,setError]=useState()
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
    const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/categories`

    const [categories,setCategories]=useState({
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
        setCategories({
            loading:true,  
            data:null,
            error:false,
        })
        axios.get(url)
            .then(response=>{
                setCategories({
                    loading:false,
                    data:response.data,
                    error:false,
                })
            })
            .catch(err=>{
                setError(err)
                setCategories({
                    loading:false,
                    data:null,
                    error:true,
                })
            })
    },[url])

    let content=null
   

    if(categories.error){
        content=<h1 className="text-center text-3xl bold text-red-500 content-center">Error:{requestError.message} please refresh</h1>
    }

    if(categories.loading){
        content=<Loading/>
    }

    if(categories.data){
        content= categories.data.map((category,key)=>
            <div key={category.id}>
                <li className="block text-blue-500 py-3  border-t border-b">
                    {category.name}
                </li>
            </div>
        )
    }





    return(
        <div >
            <h1 className="font bold text-2xl py-3">Categories</h1>

            {content}
        </div>
        
    )


    return(
        <div>
             <div className="font-bold py-3">
                 Categories
            </div>
            <ul>
                <li>
                    <Link onClick={props.closeMenu} to="/" className="block text-blue-500 py-3  border-t border-b">Home</Link>
                </li>
                <li>
                    <Link onClick={props.closeMenu} to="/about" className="block text-blue-500 py-3 border-b">About</Link>
                </li>
            </ul>
        </div>
    )
}

export default Categories