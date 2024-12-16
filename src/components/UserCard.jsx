import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import axios from "axios";
const UserCard = ({ user }) => {
    if (!user) {
        return <p>No user data available</p>; // Fallback UI
    }
    const dispatch=useDispatch()
    const {firstName,lastName,age,gender,photoUrl,_id}=user
    const handleSendRequest=async(status,_id)=>{
        try{
          const res=await axios.post("http://localhost:3000/request/send/"+status+"/"+_id,
            {},
            {withCredentials:true}
          )
          dispatch(removeFeed(_id))
        }catch(err){
            console.log(err.message)
        }
     }
    return (
        <div className="card bg-base-300 w-96 shadow-xl">
            <figure>
                <img
                    src={photoUrl || "https://via.placeholder.com/150"} // Default image
                    alt={firstName || "User"}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">
                    {firstName} {lastName}
                </h2>
                {/* <p>Email: {email}</p> */}
                <p>Age : {age}</p>
                <p>Gender: {gender}</p>
                <div className="card-actions justify-center gap-8">
                    <button 
                    className="btn btn-primary"
                    onClick={()=>(handleSendRequest("ignored",_id))}
                    >Ignore</button>

                    <button 
                    className="btn btn-secondary"
                    onClick={()=>(handleSendRequest("interested",_id))}
                    >Interested</button>
                </div>
            </div>
        </div>
    );
};
export default UserCard;
