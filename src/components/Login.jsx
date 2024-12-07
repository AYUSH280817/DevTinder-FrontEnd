import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import { addUser } from "../utils/userSlice"
import { useNavigate } from "react-router-dom"
const Login=()=>{
    const [email,setemail]=useState("ayushsingh@gmail.com")
    const [password,setPassword]=useState("Ayush@2808")
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleLoginIn=async()=>{
        try{
            const res=await axios.post("http://localhost:3000/login",{
                email,
                password,
            },{withCredentials:true})
            console.log(res)
            dispatch(addUser(res.data))
            navigate("/");
        }catch(err){
         
          console.log(err)
        }
    }
    return(
    <div className="flex justify-center my-10">
    <div className="card bg-base-100 w-96 shadow-xl ">
     <div className="card-body justify-center">
    <h2 className="card-title justify-center font-bold ">Login</h2>
    <div className="card-actions justify-center">

    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Email id</span>
    </div>
    <input
     value={email}
     type="text"
     placeholder="Type here" 
     className="input input-bordered w-full max-w-xs" 
     onChange={(e)=>setemail(e.target.value)}
      />

    </label>
    <label className="form-control w-full max-w-xs">
    <div className="label">
    <span className="label-text">Password</span>
    </div>

    <input
    value={password}
     type="Password" 
     placeholder="Type here"
      className="input input-bordered w-full max-w-xs" 
      onChange={(e)=>setPassword(e.target.value)}
      />

    </label>
    <button 
    className="btn btn-primary justify-center my-2"
    onClick={handleLoginIn}
    >Login</button>
   </div>
   </div>
   </div>
   </div>
    )
}
export default Login