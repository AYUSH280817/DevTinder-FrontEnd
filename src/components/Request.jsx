import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addRequests, removeRequest } from "../utils/requestSlice"
import { useEffect } from "react"

const Request=()=>{
    const dispatch=useDispatch()
    const connections=useSelector(store=>store.requests)
     const reviewrequest=async(status,_id)=>{
      const res=await axios.post("http://localhost:3000/request/review/" + status+"/"+_id,
        {},
        {withCredentials:true}
      )
      dispatch(removeRequest(_id))
     }
    const request=async ()=>{
       const res=await axios.get("http://localhost:3000/user/requests/received",
        {withCredentials:true})
        console.log(res.data.data)
        dispatch(addRequests(res.data.data))
    }
  useEffect(()=>{
    request()
  },[])
    return(
        <div className="text-center my-10">
          <h1 className="font-bold text-4xl text-Black-800 mb-6">Rejects</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {connections.map((connection) => {
              const { firstName, lastName, photoUrl, age, gender } = connection.fromUserId;
              return (
                <div
                  key={connection._id}
                  className="bg-white shadow-lg rounded-lg overflow-hidden w-80 hover:scale-105 transform transition-transform duration-300"
                >
                  {/* Image Wrapper with Aspect Ratio */}
                  <div className="aspect-w-16 aspect-h-9">
                    <img
                      alt="photo"
                      src={photoUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
      
                  {/* Content */}
                  <div className="p-4 text-gray-700">
                    <h2 className="font-semibold text-xl mb-2">
                      {firstName} {lastName}
                    </h2>
                    <p>
                      <span className="font-medium">Gender:</span> {gender}
                    </p>
                    <p>
                      <span className="font-medium">Age:</span> {age}
                    </p>
                  </div>
               <div className="mx-10 my-2">

               <button 
               className="btn btn-primary mx-2"
               onClick={()=>reviewrequest("accepted",connection._id)}
               >Accept      
               </button>

               <button 
               className="btn btn-secondary"
               onClick={()=>reviewrequest("rejected",connection._id)}
               >Reject
               </button>

               </div>
           
                </div>
              );
            })}
          </div>
        </div>
    )
}
export default Request