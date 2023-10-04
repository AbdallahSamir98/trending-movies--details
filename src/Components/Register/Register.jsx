import axios from "axios";
import Joi, { string } from "joi";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [joiError, setJoiError] = useState(null); //store joi error
  const [apiMessage, setApiMessage] = useState(""); //store api error

  let navigate = useNavigate();

  const [user, setUser] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    age: 0,
  });

  function getUserData(e) {    //function for store value l inputs ele l user hyd5lha

    let myUser = { ...user };
    myUser[e.target.id] = e.target.value; //3lshan kol inputs store l data bta3to bl id
    setUser(myUser);

    setJoiError(null) //to change joi error when user rewrite on inputs
    setApiMessage('')

  }

  function submitData(e) {//function for validation and send api and display error for validtion
    
    e.preventDefault(); //3lshan el form mt3mlsh refresh

    // joi validation
    const schema = Joi.object({
      first_name: Joi.string().alphanum().min(3).max(12).required(),
      last_name: Joi.string().alphanum().min(3).max(12).required(),
      email: Joi.string().email({tlds:{allow:['com','net']}}).required(),
      password: Joi.string().required(),
      age: Joi.number().min(15).max(80).required(),
    });
    let joiResponse = schema.validate(user, { abortEarly: false });

    if (joiResponse.error == undefined) {
      // kda data valid sed api
      sendDatatpApi();

    } else {
      // data invalid
      setJoiError(joiResponse.error.details);
      

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





  async function sendDatatpApi() {
    //api function for send form data to the backend
    let { data } = await axios.post(
      "https://movies-api.routemisr.com/signup",
      user
    );
    console.log(data);

    if (data.message == "success") {
      navigate("/login");
    } else {
      setApiMessage(data.message);
    }
  }




  return (
    <>
      <div className="container">
        <form onSubmit={submitData} className="w-50 m-auto mt-3">
          
          <h2 className="mb-4 text-muted">Registration Form</h2>
          <label htmlFor="first_name" className="form-label">
            First Name
          </label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control mb-3 "
            id="first_name"
            placeholder="name"
          />
          {displayValidationError('first_name')? <div className="alert alert-danger  ">{displayValidationError('first_name')}   </div>:''}

          <label htmlFor="last_name" className="form-label">
            last Name
          </label>
          <input
            onChange={getUserData}
            type="text"
            className="form-control mb-3"
            id="last_name"
            placeholder="last name"
          />
          {displayValidationError('last_name')? <div className="alert alert-danger  ">{displayValidationError('last_name')}   </div>:''}

          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            onChange={getUserData}
            type="email"
            className="form-control mb-3"
            id="email"
            placeholder="name@example.com"
          />
          {displayValidationError('email')? <div className="alert alert-danger  ">{displayValidationError('email')}   </div>:''}

          <label htmlFor="password" className="form-label">
            password
          </label>
          <input
            onChange={getUserData}
            type="password"
            className="form-control mb-3"
            id="password"
            placeholder="password"
          />
          {displayValidationError('password')? <div className="alert alert-danger  ">`Password should be between 3 to 30 characters and contain letters or numbers only  </div>:''}

          <label htmlFor="age" className="form-label">
            age{" "}
          </label>
          <input
            onChange={getUserData}
            type="number"
            className="form-control mb-2"
            id="age"
            placeholder="age"
          />
          {displayValidationError('age')? <div className="alert alert-danger  ">{displayValidationError('age')}   </div>:''}
          {apiMessage.length == 0 ? "" : <div className="alert alert-danger">{apiMessage}</div>}

          <button type="submit" className="btn btn-success my-3">
            {" "}
            signup
          </button>
        <span className='ms-3'>you already have an account  ?  <Link className='text-danger border-bottom border-danger' to='/login'>login here</Link> </span>

        </form>
      </div>
    </>
  );
}
