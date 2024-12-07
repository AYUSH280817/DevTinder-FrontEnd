import { Outlet, useNavigate } from "react-router-dom"
import Navbar from "./NavBar"
import Footer from "./Footer"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { useEffect } from "react"
import { addUser } from "../utils/userSlice";

const Body=()=>{
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const user=useSelector(store=>store.user)
    const fetchUser = async () => {
      if (user) return
         try {
            const res = await axios.get("http://localhost:3000/profile", {
                withCredentials: true
            });
            dispatch(addUser(res.data)); // Pass the user data to addUser
        } catch (err) {
            if(err.status===401)
                {
                  navigate("/login")
                }
            console.log(err);
        }
    
    };
    useEffect(()=>{
        fetchUser();
    },[]);
    return(
        <div>
            <Navbar/>
            <Outlet/>
            <Footer/>
        </div>
    )
}
export default Body;