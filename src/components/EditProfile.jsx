import { useState } from "react"
import UserCard from "./UserCard";
import { useDispatch} from "react-redux";
import axios from "axios";
import { addUser } from "../utils/userSlice";
const EditProfile=({user})=>{

    const [firstName,setfirstName]=useState(user.firstName);
    const [lastName,setlastName]=useState(user.lastName);
    const [age,setAge]=useState(user.age)
    const [gender,setGender]=useState(user.gender)
    const [photoUrl,setprofileURL]=useState(user.photoUrl)
    const [error,seterror]=useState("")
    const [showToast,setshowToast]=useState(false);
    const dispatch=useDispatch()
    
    const saveProfile = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/profile/edit",
          {
            firstName,
            lastName,
            photoUrl,
            age,
            gender,
          },
          { withCredentials: true }  // Ensure credentials (cookies) are sent
        );
        dispatch(addUser(res.data.data));
        setshowToast(true)
        setTimeout(()=>{
          setshowToast(false)
        },3000)
      } catch (err) {
        seterror(err.message);
      }
    };
    return(
      <div>
          <div className="flex justify-center  my-10 ">

<div className="card bg-base-300 w-96 shadow-xl mx-20 ">
 <div className="card-body justify-center">
<h2 className="card-title justify-center font-bold ">Edit Profile</h2>
<div className="card-actions justify-center">

<label className="form-control w-full max-w-xs">
<div className="label">
<span className="label-text">First Name</span>
</div>
<input
 value={firstName}
 type="text"
 placeholder="Type here" 
 className="input input-bordered w-full max-w-xs" 
 onChange={(e)=>setfirstName(e.target.value)}
  />
</label>

<label className="form-control w-full max-w-xs">
<div className="label">
<span className="label-text">Last Name</span>
</div> 
<input
value={lastName}
 type="text" 
 placeholder="Type here"
  className="input input-bordered w-full max-w-xs" 
  onChange={(e)=>setlastName(e.target.value)}
  />
</label>


<label className="form-control w-full max-w-xs">
<div className="label">
<span className="label-text">Age</span>
</div>
<input
 value={age}
 type="text"
 placeholder="Type here" 
 className="input input-bordered w-full max-w-xs" 
 onChange={(e)=>setAge(e.target.value)}
  />
</label>


<label className="form-control w-full max-w-xs">
<div className="label">
<span className="label-text">Gender</span>
</div>
<input
 value={gender}
 type="text"
 placeholder="Type here" 
 className="input input-bordered w-full max-w-xs" 
 onChange={(e)=>setGender(e.target.value)}
  />
</label>


<label className="form-control w-full max-w-xs">
<div className="label">
<span className="label-text">PhotoURL</span>
</div>
<input
 value={photoUrl}
 type="text"
 placeholder="Type here" 
 className="input input-bordered w-full max-w-xs" 
 onChange={(e)=>setprofileURL(e.target.value)}
  />
</label>

<div >
<p className="text-red-500 ">{error}</p>
<button 
className="btn btn-primary justify-center my-2"
onClick={saveProfile}
>Save Profile </button>
</div>      
</div>
</div>
</div>
<UserCard user={{firstName,lastName,age,gender,photoUrl}}/>
</div>

{showToast && <div className="toast toast-top toast-center">
  <div className="alert alert-info">
    <span>Updated Data is Saved.</span>
   
  </div>

</div>}

      </div>
      
    )
}
export default EditProfile
