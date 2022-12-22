import React from 'react'
import home from '../Home/home.module.css'
import { Link } from 'react-router-dom'

import { ApiContext } from '../../Context/Context'
import { useContext } from 'react'
export default function Movies() {
  
  
  
 
  const {allPerson,pages,currentPage,changePage,prevPage,nextPage,search}= useContext(ApiContext);
  
  return (


   


<>
{/* 3aml ternaly operation 3lshan check data gat wala la  */}

  {allPerson  ?  //l data gat mn l api a3rdha 

<div className="container mt-4">
<input type="search" className='form form-control mb-4' placeholder='search ...' onChange={(e)=>search(e,'person')} />


<div className="row ">
<div className="col-md-4 d-flex align-items-center mt-5">
  <div className={home.content +" mb-lg-5"  }  >
    <h4>Trending person To Watch</h4>
    <p className='w-75 text-danger '>Discover the the, most popular person available now! </p>
  </div>
</div>

{allPerson.filter((person)=>person.profile_path !==null ).map((person,index)=><div key={index} className="col-md-2 mt-3 ">
  <Link to={`/moviesdetails/person/${person.id}`}>{/* 3lshan ab3t l id fe l url  */}

  <div className="moviescontent ">
 
      <div className='position-relative layer'>
      {person.profile_path ?       <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} alt="movie" className='w-100 rounded' />

         

      
 :''}
 <div className='overlayer rounded'>
 <h6 className=' mt-2'>{person.name}</h6>
 <h6 className=' mt-2'>{person.known_for_department}</h6>

 </div>
 </div>
    
  <h6 className=' mt-2'>{person.name}</h6>

  </div>
  </Link>
</div>
)}


</div>


<nav aria-label="Page navigation example" className='d-flex justify-content-center my-3 '>
  <ul className="pagination ">
    <li className={currentPage <= 1 ?'page-item disabled  ':'page-item '}><a className="page-link" onClick={()=>prevPage()}>Previous</a></li>

    {pages.map((page,idx)=>  <li key={idx} className="page-item  "><a className={page== currentPage?'page-link active':"page-link paginationicon "}   onClick={()=>changePage(page)}>{page}</a></li>)}
   
   
    <li className={currentPage >= 20 ?'page-item disabled':'page-item'}><a className="page-link" onClick={()=>nextPage()}>Next</a></li>
  </ul>
</nav>


</div> ://lw all movies lsa mgbt4 l data a3ml loading screen  
<div className="vh-100 d-flex justify-content-center align-items-center">

<i className='fa-solid fa-spin fa-spinner fa-5x'></i>
</div>
 


  
}



  </>



  )


}
