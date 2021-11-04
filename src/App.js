import './App.css';
import Footer from './Components/Footer';
import Home from './Views/Home'
import React ,{useEffect, useState} from "react";
import axios from 'axios'
import Navigation from './Components/Navigation';
import Searchbar from './Components/Searchbar';
import Logo from './Components/Logo';


function App() {

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

  //Fetch Products
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
  },[url])

  //Handling the response
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
                    filteredProducts.push(products.data[i])
                }
            }
        }
        setDisplayList(filteredProducts)
      }
},[searchTerm])
  

    //filterCategories
    function chooseCategory(id){
        const filteredProducts=[]

        for(let i=0; i<products.data.length; i++){
            if(products.data[i].categoryId.includes(id)){
                filteredProducts.push(products.data[i])
            }
        }

        setDisplayList(filteredProducts)
    }

  return (
    <div className="bg-gray-100 relative pb-10 min-h-screen">
        <header className="border-b mb-4 sm:p-2 md:p-5 xl:p-10  grid grid-cols-3">
            <Logo/>
            <Searchbar setSearchTerm={setSearchTerm}/>
            <Navigation chooseCategory={chooseCategory}/>
        </header>
        <Home displayList={displayList} setDisplayList={setDisplayList} error={products.error} isLoading={products.isLoading}/>
        <Footer/>
    </div>
  );
}

export default App;
