import axios from "axios";
import { createContext, useEffect, useState } from "react";




export const ApiContext = createContext()




export function ApiContextFunction(props){


    const [allMovies, setAllMovies] = useState(null) //store movies data
    const [allTv, setAllTv] = useState(null) //store Tv data
    const [allPerson, setAllPerson] = useState(null) //store Tv data
   
    const [currentPage, setCurrentPage] = useState(1) //for pagination
    const [pages, setPages] = useState([]) //for pagination
   
   
       async function getTrendingMovies(){  //trending movies api function
  
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=052025105fb6aa8c62f1ebfce9cbbd40&page=${currentPage}`)
          let pageList =new Array(20).fill(0).map((page,i)=>i+1)
          setPages(pageList)
          setAllMovies(data.results)
       }
  
       async function getTv(){  //trending tv api function
  
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/tv/week?api_key=052025105fb6aa8c62f1ebfce9cbbd40&page=${currentPage}`)
          
          setAllTv(data.results)
       }
       async function getTrendingPerson(){  //trending person api function
  
        let {data} = await axios.get(`https://api.themoviedb.org/3/trending/person/week?api_key=052025105fb6aa8c62f1ebfce9cbbd40&page=${currentPage}`)
          
        setAllPerson(data.results)
       }



       async function search(e , media){  //search api function
         if (e.target.value){
            let {data} = await axios.get(`https://api.themoviedb.org/3/search/${media}?api_key=052025105fb6aa8c62f1ebfce9cbbd40&language=en-US&query=${e.target.value}&page=1&include_adult=false`)
           
          setAllTv(data.results)
        setAllPerson(data.results)
        setAllMovies(data.results)
         }else{
            getTrendingMovies()
           
           
         }
  
               
       }
 










       useEffect(function(){ //call api
        
      
         getTrendingMovies()
         getTv()
         getTrendingPerson()  
     
        
        },[])



       useEffect(function(){ //call api
         getTrendingMovies()
            getTv()
            getTrendingPerson()

       
       },[currentPage])

     
    
     const changePage =  function(pageIndex){
         setCurrentPage(pageIndex)
         
       }
      const nextPage = ()=>{
         setCurrentPage(currentPage + 1)
        
       }

       const prevPage = ()=>{
         setCurrentPage(currentPage - 1)
        
       }
  
  

    return<ApiContext.Provider value={{allMovies:allMovies,allTv:allTv,allPerson:allPerson ,pages:pages,currentPage:currentPage ,changePage:changePage,nextPage:nextPage,prevPage:prevPage ,search:search}}>
    
    {props.children}


    </ApiContext.Provider>
}