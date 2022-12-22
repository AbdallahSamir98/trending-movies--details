import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import home from '../Home/home.module.css'
import { ApiContext } from '../../Context/Context'
export default function Movies() {
  
 
  const {allMovies,pages,currentPage,changePage,prevPage,nextPage,search}= useContext(ApiContext);


  
  return (








<>
{/* 3aml ternaly operation 3lshan check data gat wala la  */}

  {allMovies  ?  //l data gat mn l api a3rdha 

<div className="container mt-4">
<input type="search" className='form form-control mb-5' placeholder='search ...' onChange={(e)=>search(e,'movie')} />

<div className="row ">

<div className="col-md-4 d-flex align-items-center mt-5">
  <div className={home.content +" mb-lg-5"  }  >
    <h4>Trending Movies To Watch</h4>
    <p className='w-75 text-danger '>Discover the the, most popular movies available now! </p>
  </div>
</div>

{allMovies.filter((movie)=>movie.poster_path !==null ).map((movie,index)=><div key={index} className="col-md-2 mt-3">
  <Link to={`/moviesdetails/movie/${movie.id}`}>{/* 3lshan ab3t l id fe l url  */}

  <div className="moviescontent">
    <div className="position-relative layer">
    <img src={'https://image.tmdb.org/t/p/w500' + movie.poster_path} alt="movie" className='w-100 rounded' />
    <div className="overlayer rounded">
    <h6 className=' mt-2'>{movie.title}</h6>
    <p className='badge p-2 bg-success'><i className="fa-solid fa-star"></i> {movie.vote_average.toFixed(2)}</p>

    </div>
    </div>
  <h6 className=' mt-2'>{movie.title}</h6>

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
