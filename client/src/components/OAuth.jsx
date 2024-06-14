import React from 'react'
import { FcGoogle } from "react-icons/fc";

const OAuth = () => {

    async function handleGoogleClick(){
        try{

        }catch(e){
            
        }
    }

  return (
    <button onClick={handleGoogleClick} type='button' className='btn btn-secondary'><FcGoogle className='w-4 h-4'></FcGoogle> Continue with Google</button>
  )
}

export default OAuth