import axios, { Axios } from 'axios'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../Context/Context'
import home from '../Home/home.module.css'


export default function Tv() {
  
  const {allTv,pages,currentPage,changePage,prevPage,nextPage,searchTv}= useContext(ApiContext);

  



  
  return (





<>
{/* 3aml ternaly operation 3lshan check data gat wala la  */}

  { allTv ?  //l data gat mn l api a3rdha 

<div className="container mt-4">

<input type="search" className='form form-control' placeholder='search ...' onChange={(e)=>searchTv(e)} />




<div className="row align-items-center  mt-5">
<div className="col-md-4 d-flex align-items-center  ">
  <div className={home.content}>
    <h4 > Tv show To Watch ...</h4>
    <p className='w-75 text-danger '>Discover the the, most popular tv available now! </p>
  </div>
</div>
{allTv.filter((tv)=>tv.poster_path !==null ).map((tv,index)=><div key={index} className="col-md-2 mt-3">
  <Link to={`/moviesdetails/tv/${tv.id}`}>
  <div className="tvcontent ">

    <div className="position-relative layer">
    <img src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} alt="tvshow" className='w-100 rounded' />
    <div className="overlayer rounded">
    <h6 className=' mt-2'>{tv.name}</h6>
    <p className='badge p-2 bg-success'><i class="fa-solid fa-star"></i> {tv.vote_average.toFixed(2)}</p>

    </div>
    </div>
  <h6 className=' mt-2'>{tv.name}</h6>

  </div>
  </Link>
</div>
)}

</div>
<nav aria-label="Page navigation example " className='d-flex justify-content-center my-3 '>
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
