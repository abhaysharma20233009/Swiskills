import React, { useState } from 'react'
//import SignupForm from './signup'
//import LoginForm from './login'
const handdleOnClick=()=>{

}
const Signuplogin = () => {
  const [path,setPath]=useState(false);
  return (
    <div>
      <SignupForm/>
      <LoginForm handdleOnClick/>
    </div>
  )
}

export default Signuplogin
