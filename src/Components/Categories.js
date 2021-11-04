import {React , useState , useEffect} from "react";
import axios from "axios";
import Loading from "../../../../FoodApp/foodapp-assessment/src/Components/Loading";

function Categories(props){
    //Fetch and Render Categories on Menu

    const [requestError,setError]=useState()
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
    const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/categories`

    const [categories,setCategories]=useState({
        isLoading:false,
        data:null,
        error:undefined,
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
    
    //Fetch Categories
    useEffect(()=>{
        setCategories({
            isLoading:true,  
            data:null,
            error:false,
        })
        axios.get(url)
            .then(response=>{
                setCategories({
                    loading:false,
                    data:response.data.sort((a, b) => (a.index > b.index) ? 1 : -1),
                    error:false,
                })
            })
            .catch(error=>{
                setCategories({
                    loading:false,
                    data:null,
                    error
                })
            })
    },[])

    //Handling the response

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
                <li onClick={props.closeMenu}  className="block text-xl font-bold text-gray-800 py-3  border-t border-b bg-blue-200 hover:bg-gray-400  rounded-l text-center">
                   <button id={category.id} name={category.name} onClick={e=>{
                    console.log(`${e.target.name}===>${e.target.id}` )
                    props.getClickedCategory(e.target.id)
                    }} > {category.name}</button>
                </li>
            </div>
        )
    }

    return(
        <div >
            <h1 className="font-bold text-gray-800 text-3xl py-3 text-center">Categories</h1>

            {content}
        </div>
        
    )
}

export default Categories