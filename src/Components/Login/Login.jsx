import axios from 'axios';
import Joi, { string } from 'joi';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';



export default function Login({loginUserData}) {
 
 const [joiError, setJoiError] = useState(null) //store joi error  
 const [apiMessage, setApiMessage] = useState('') //store api error

 let navigate =useNavigate()

 const [user, setUser] = useState({
   
    email:'',
    password:'',
    
  })
 
    function getUserData(e){  //function for store value l inputs ele l user hyd5lha
     let myUser={...user}
     myUser[e.target.id]=e.target.value; //3lshan kol inputs store l data bta3to bl id
     setUser(myUser);


    }

      function submitData(e){ //function for validation and send api and display error for validtion
        e.preventDefault() //3lshan el form mt3mlsh refresh
        
        // joi validation
        const schema =Joi.object({
          
          email: Joi.string().email({tlds:{allow:['com','net']}}).required(),
          password: Joi.string().required(),
        })
       let joiResponse= schema.validate(user,{abortEarly:false})

       
        if(joiResponse.error==undefined){
          // kda data valid sed api
          sendDatatpApi()
          
        }else{
          // data invalid 
       setJoiError(joiResponse.error.details)
       

        }
     
      }
      function displayValidationError(key){ //function for display error validation to user 
  
        if(joiError != null){ //at2kd an l user 3ndo input x error 
          for(let i=0 ; i<joiError.length ;i++){
            if(joiError[i].context.key == key){
              return joiError[i].message
            }
          }
          return ''
        }
    }




       async function sendDatatpApi(){  //api function for send form data to the backend
        let {data}= await axios.post('https://route-movies-api.vercel.app/signin', user)
        console.log(data);

        if(data.message === 'success' ){
         localStorage.setItem('tkn',data.token) //store user data login in local storage ,user data btb2a goa l token
         loginUserData()  //de l function ele ba3tha x l parameter gaya mn l props bta3 app component x l login 
         navigate('/home')
        }else{
          setApiMessage(data.message)
          console.log(          setApiMessage(data.message)
            )
        }
      }

     
      
  return (
    <>
    
      <div className="container">
      
        <form onSubmit={submitData} className='w-50 m-auto mt-5'>
        <h2 className="mb-4 text-muted">Login Form</h2>
        
        <label htmlFor="email" className="form-label">Email address</label>
        <input onChange={getUserData} type="email" className="form-control mb-3" id="email" placeholder="name@example.com"/>

        {displayValidationError('email')? <div className="alert alert-danger  ">{displayValidationError('email')}   </div>:''}

        <label htmlFor="password" className="form-label">password</label>
        <input onChange={getUserData} type="password" className="form-control mb-3" id="password" placeholder="password"/>
        {displayValidationError('password')? <div className="alert alert-danger  "> {displayValidationError('password')} </div>:''}

        {apiMessage.length==0? '' :<div className='alert alert-danger'>{apiMessage}</div>}
        

        <button type='submit' className='btn btn-success my-3'> login</button>
        <span className='ms-3'> Don't have an account yet ?  <Link className='text-danger border-bottom border-danger' to='/register'>Register here</Link> </span>



        </form>


      </div>




    </>
  )
}