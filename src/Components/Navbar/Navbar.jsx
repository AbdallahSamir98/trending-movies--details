import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar({crrUser , removeData}) {


 const logoutNavigate= useNavigate() //to navigate user when logout


  function logOut(){ //make user logout
    console.log('out');
    // function to remove data from app js 
    removeData()
    logoutNavigate('/login') //to navigate user when logout to login page

  }



  return (
    <>
    
    
    <nav className="navbar navbar-expand-lg  navbar-dark">
  <div className="container-fluid">
     {localStorage.getItem('tkn')==null?
    <Link className="navbar-brand" to="/login"><h2>HBO</h2></Link>
  :
  <Link className="navbar-brand" to="/home"><h2>HBO</h2></Link>
}

  
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      
      
      {crrUser?<ul className="navbar-nav me-auto mb-2 mb-lg-0">
       
       <li className="nav-item">
           <Link className="nav-link active" aria-current="page"to='home'>Home</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link active" aria-current="page"to='movies'>Movies</Link>
         </li>
         <li className="nav-item">
           <Link className="nav-link active" aria-current="page"to='tv'>Tv show</Link>
         </li> <li className="nav-item">
           <Link className="nav-link active" aria-current="page"to='people'>person</Link>
         </li>
        
       
       </ul> : '' }
      
      




      <ul className="navbar-nav text-white ms-auto navbar-dark mb-2 mb-lg-0  justify-content-center align-items-center">
      
     

      {crrUser? <>
       
    
 
      <li className="nav-item">
           <Link className="nav-link active" aria-current="page"to='home'> {crrUser.first_name}</Link>
         </li>
     
      <li className="nav-item ms-3">
      <span className="nav-link active logout rounded bg-danger" aria-current="page" onClick={logOut}>logout</span>
   </li>
      </> : <>
      
   {/* <li className="nav-item ms-3 rounded bg-success">
         <Link className="nav-link active " aria-current="page"to='login'>login</Link>
      </li>
      <li className="nav-item ms-3 rounded bg-danger">
         <Link className="nav-link active " aria-current="page"to='register'>Register</Link>
      </li> */}
   </> }
     



     
       
      
      </ul>


    
    </div>
  </div>
</nav>
    
    
    </>
  )
}
