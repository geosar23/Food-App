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

  const [requestError,setError]=useState()
  const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.LBHszzcjG4uVpYR-SpxUUbUEwhz8S8csczNW63L93xM'
  const url=`https://fe-assignment-server.herokuapp.com/api/v1/food/products`

  const [products,setProducts]=useState({
      loading:false,
      data:[],
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

  //Handling the response
  useEffect(()=>{
      setProducts({
          loading:true,  
          data:[],
          error:false,
      })
      axios.get(url)
          .then(response=>{
              setProducts({
                  loading:false,
                  data:response.data, //Setting the data to product
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

  //Setting fetched Content

  let content=null
 

  if(products.error){
      content=<h1 className="text-center text-3xl bold text-red-500 content-center">Error:{requestError.message} please refresh</h1>
  }

  if(products.loading){
      content=<Loading/>
  }

  //Setting SearchTerm 
  const [searchTerm,setSearchTerm]=useState('')
  console.log(searchTerm)

  
  //Filtering with SearchBar
  if(products.data && searchTerm===""){
    content= products.data.map((product)=>
        <div key={product.id}>
            <ProductCard product={product}/>
        </div>
        )
    }else {
        let filterableProducts=[]

        for(let i=0; i<products.data.length; i++){
            if(products.data[i].name.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "").includes(searchTerm.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, ""))
                ||
                products.data[i].id.includes(searchTerm)){
                    console.log(products.data[i].name)
                filterableProducts.push(products.data[i])

            }
        }

        content=filterableProducts.map((product)=>
        <div key={product.id}>
            <ProductCard product={product}/>
        </div>
        )
    }

    //filterCategories
    function choosedCategory(id){
        console.log(id)
        let filterableProducts2=[]

        for(let i=0; i<products.data.length; i++){
            if(products.data[i].categoryId.includes(id)){
                filterableProducts2.push(products.data[i])
            }
        }

        setProducts({
            loading:false,
            data:filterableProducts2,
            error:false,
        })

        content=filterableProducts2.map((product)=>
        <div key={product.id}>
            <ProductCard product={product}/>
        </div>
        )

        console.log(filterableProducts2)
    }
    

    console.log(products)
    console.log(content)
  
  return (
    <div className="relative pb-10 min-h-screen">
      <header className="m-3 border-b p-4 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-800">George Saramantis</span>
            <div className="shadow flex">
                <input className="w-full rounded p-2" onChange={e=>{
                    setSearchTerm(e.target.value)
                    }} 
                    type="text" 
                    placeholder="Search..." />
                <button className="bg-white w-auto flex justify-end items-center text-gray-800 p-2 hover:text-gray-800">
                    <i className="material-icons">search</i>
                </button>
            </div> 
            <Navigation choosedCategory={choosedCategory}/>
        </header>
      <Home content={content} />
      <Footer/>
    </div>
  );
}

export default App;
