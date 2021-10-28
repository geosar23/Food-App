import {React , useState} from "react";
import {Link} from "react-router-dom"
import axios from "axios";

function Categories(props){

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