import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { addFeed } from "../utils/feedSlice";
import { useEffect } from "react";
import UserCard from "./UserCard";


const Feed = () => {
    const feed = useSelector((store) => store.feed);
    const dispatch = useDispatch();
    const getFeed = async () => {
        if (feed && feed.length > 0) return;
        try {
            const res = await axios.get("http://localhost:3000/feed", { withCredentials: true });

            dispatch(addFeed(res.data)); 
            console.log(res.data)// Wrap response in an array
        } catch (error) {
            console.error("Error fetching feed:", error);
        }
    };

    useEffect(() => {
        getFeed();
    }, []); // Fetch data when `feed` changes
      if(feed.length <=0) return <h1> No New User Founds</h1>
    return (
        <div className="flex justify-center my-10">
            <UserCard user={feed[0]} />
        </div>
    );
};
export default Feed;
