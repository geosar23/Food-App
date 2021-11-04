import './App.css';
import Footer from './Components/Footer';
import Home from './Views/Home'
import React ,{useEffect, useState} from "react";
import axios from 'axios'
import Loading from './Components/Loading';
import ProductCard from './Components/ProductCard';
import Navigation from './Components/Navigation';


function App() {
  //Fetched Products

 
  const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
  const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/products`

  const [products,setProducts]=useState({
      isLoading:true,
      data:[],
      error:undefined,
  })
  const [displayList, setDisplayList]=useState([])
  const [searchTerm,setSearchTerm]=useState('')

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

  //Handling the response
  useEffect(()=>{
    axios.get(url)
        .then(response=>{
            setProducts({
                isLoading:false,
                data:response.data, //Setting the data to product
                error:undefined,
            })
            setDisplayList(response.data)
        })
        .catch(error=>{
            setProducts({
                isLoading:false,
                data:null,
                error
            })
            setDisplayList([])
        })
  },[])


  useEffect(()=>{
      if(!searchTerm){
        setDisplayList(products.data)
      }else{
        const filteredProducts = []
        if(products.data && products.data.length){
            for(let i=0; i<products.data.length; i++){
                const filterMatchesName = products.data[i].name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
                const filterMatchesId = products.data[i].id.includes(searchTerm)
                if(filterMatchesName || filterMatchesId){
                    console.log(products.data[i].name)
                    filteredProducts.push(products.data[i])
                }
            }
        }
        setDisplayList(filteredProducts)
      }
},[searchTerm])
  

    //filterCategories
    function chooseCategory(id){
        console.log(id)
        const filteredProducts=[]

        for(let i=0; i<products.data.length; i++){
            if(products.data[i].categoryId.includes(id)){
                filteredProducts.push(products.data[i])
            }
        }

        setDisplayList(filteredProducts)
    }



    function reloadPage(){
        window.location.reload(true);
    }

    // 
    // // if(products.loading){
    //     content=<Loading/>
    // }
  
  return (
    <div className="bg-gray-100 relative pb-10 min-h-screen">
        <header className="border-b p-4 flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800" >
                <button onClick={reloadPage} >George Saramantis</button>
            </span>
            <div className=" shadow flex">
                <input 
                    className="context-center w-full rounded p-2" 
                    onChange={e=>{
                        setSearchTerm(e.target.value)
                    }} 
                    type="text" 
                    placeholder="Search..." />
                <button className="bg-white w-auto flex justify-end items-center text-gray-800 p-2 hover:text-gray-800">
                    <i className="material-icons">search</i>
                </button>
            </div> 
            <Navigation chooseCategory={chooseCategory}/>
        </header>
      <Home displayList={displayList} setDisplayList={setDisplayList} error={products.error} isLoading={products.isLoading}/>
      <Footer/>
    </div>
  );
}

export default App;
