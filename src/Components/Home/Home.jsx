import React from 'react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { ApiContext } from '../../Context/Context'
import home from './home.module.css'


export default function Home() {
  
  const {allMovies,allPerson,allTv,search} = useContext(ApiContext);

  
  return (


    <>
  {/* 3aml ternaly operation 3lshan check data gat wala la  */}
  
    {allMovies && allTv && allPerson ?  //l data gat mn l api a3rdha 

<div className="container mt-4">


<div className="row ">
  <div className="col-md-4 d-flex align-items-center mt-5">
    <div className={home.content +" mb-lg-5"  }  >
      <h4>Trending Movies To Watch</h4>
      <p className='w-75 text-danger '>Discover the the, most popular movies available now! </p>
    </div>
  </div>

{allMovies.slice(0,10).map((movie,index)=><div key={index} className="col-md-2 mt-3">
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


<div className="row align-items-center border-top mt-5">
  <div className="col-md-4 d-flex align-items-center  ">
    <div className={home.content}>
      <h4 >Trending Tv To Watch ...</h4>
      <p className='w-75 text-danger '>Discover the the, most popular tv available now! </p>
    </div>
  </div>
{allTv.slice(0,10).map((tv,index)=><div key={index} className="col-md-2 mt-3">
    <Link to={`/moviesdetails/tv/${tv.id}`}>
    <div className="tvcontent">
    <div className="position-relative layer">
    <img src={'https://image.tmdb.org/t/p/w500' + tv.poster_path} alt="tvshow" className='w-100 rounded' />
    <div className="overlayer rounded">
    <h6 className=' mt-2'>{tv.name}</h6>
    <p className='badge p-2 bg-success'><i className="fa-solid fa-star"></i> {tv.vote_average.toFixed(2)}</p>

    </div>
    </div>
      
    <h6 className=' mt-2'>{tv.name}</h6>

    </div>
    </Link>
  </div>
)}
 
</div>

{/* //----------------- */}



<div className="container mt-4">


<div className="row border-top mt-5">
<div className="col-md-4 d-flex align-items-center  ">
  <div className={home.content +" mb-lg-5"  }  >
    <h4>Trending person To Watch</h4>
    <p className='w-75 text-danger '>Discover the the, most popular person available now!</p>
  </div>
</div>

{allPerson.filter((person)=>person.profile_path !==null ).slice(0,10).map((person,index)=><div key={index} className="col-md-2 mt-3">
  <Link to={`/moviesdetails/person/${person.id}`}>{/* 3lshan ab3t l id fe l url  */}

  <div className="moviescontent">
       
  <div className='position-relative layer'>
      {person.profile_path ?       <img src={'https://image.tmdb.org/t/p/w500'+ person.profile_path} alt="movie" className='w-100 rounded' />

         

      
 :''}
 <div className='overlayer rounded'>
 <h6 className=' '>{person.name}</h6>
 <h6 className='  '>{person.known_for_department}</h6>
 <p className='badge p-2 bg-success'><i className="fa-solid fa-star"></i> {person.popularity}</p>


 </div>
 </div>
    
  <h6 className=' mt-2'>{person.name}</h6>

  </div>
  </Link>
</div>
)}


</div>





</div>







</div> ://lw all movies lsa mgbt4 l data a3ml loading screen  
<div className="vh-100 d-flex justify-content-center align-items-center">

<i className='fa-solid fa-spin fa-spinner fa-5x'></i>
</div>
   


    
  }



    </>

  )

  
}
