import axios from "axios";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections=()=>{
    const dispatch=useDispatch()
    const connections=useSelector(store=>store.connections)
    const fetchConnections=async()=>{
        try{
         const res=await axios.get(
            "http://localhost:3000/user/connection",
          {withCredentials:true}
        )
         dispatch(addConnections(res.data.data))
        }
        catch(err){
        //handle error
        console.log(err)
        }
    }
    useEffect(()=>{
     fetchConnections()
    },[])
    if(connections.length===0) return <h1>No Connection found</h1>
    return (
        <div className="text-center my-10">
          <h1 className="font-bold text-4xl text-Black-800 mb-6">Connections</h1>
          <div className="flex flex-wrap justify-center gap-6">
            {connections.map((connection) => {
              const { firstName, lastName, photoUrl, age, gender } = connection;
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
                </div>
              );
            })}
          </div>
        </div>
      );
      
    
      
}
export default Connections;