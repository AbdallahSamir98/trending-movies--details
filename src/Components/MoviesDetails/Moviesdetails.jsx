import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

export default function Moviesdetails() {
  
  let{media,id}= useParams(); //l id  da l parameter ele ba3to k parameter f l nested route x l app.js 

const [movieDetails, setMovieDetails] = useState(null)  //3lshan a set eldata bta3t l api(movie details)  
  
  async function getMovieDetails(){
    let {data}= await axios.get(`https://api.themoviedb.org/3/${media}/${id}?api_key=052025105fb6aa8c62f1ebfce9cbbd40&language=en-US`)
    setMovieDetails(data)
}
  useEffect(function(){
    getMovieDetails()},[]
  )
  
    return (
    <>
    {movieDetails ?   <div className="container mt-5">

<div className="row">
    <div className="col-md-3">
        <div className="poster">
          {movieDetails.profile_path ? 
        <img src={'https://image.tmdb.org/t/p/w500'+ movieDetails.profile_path} alt="movie" className='w-100 rounded' />
        :
        <img src={'https://image.tmdb.org/t/p/w500' + movieDetails.poster_path} alt="movie poster" className='w-100 rounded' />

        }
        </div>
    </div>
    <div className="col-md-9">
        <div className="contentdetails">
            <h2>{movieDetails.original_title}</h2>
            <h2>{movieDetails.name}</h2>
            <p>{movieDetails.tagline}</p>
           
           {movieDetails.genres?.map((genre,idx)=>
            <span key={idx} className='bg-info me-3  p-1 rounded '>{genre.name}</span>
            )}
           
            
            <h5 className='mt-3'>vote count : {movieDetails.vote_count}</h5>
            <h5 className='mt-3'>popularity : {movieDetails.popularity}</h5>
            <h5 className='mt-3'>release date : {movieDetails.release_date}</h5>
            <h5 className='mt-3'> {movieDetails.known_for_department}</h5>
            <p className='mt-3'>{movieDetails.overview}</p>

        </div>
    </div>
</div>



</div>  : //lw all movies lsa mgbt4 l data a3ml loading screen  
<div className="vh-100 d-flex justify-content-center align-items-center">

<i className='fa-solid fa-spin fa-spinner fa-5x'></i>
</div>
   }
   
    
    
    
    
    </>
  )
}
