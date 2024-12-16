

import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [photoUrl,setPhotoUrl]=useState("")
  const [isLog, setLog] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginIn = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
  
      console.log("Login Response:", res.data); // Log the entire response
  
      dispatch(addUser(res.data.user)); // Use the user data from the response
      // Store the token somewhere if needed (localStorage, Redux, etc.)
      localStorage.setItem('token', res.data.token);  // Optionally, store token
      navigate("/");
    } catch (err) {
      console.log("Error during login:", err.response ? err.response.data : err.message);
    }
  };
  
  const handleSignup = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/signup",
        {
          firstName,
          lastName,
          age,
          gender,
          email,
          password,
          photoUrl
        },
        { withCredentials: true }
      );
  
      console.log("Signup Response:", res.data);  // Log the signup response
  
      dispatch(addUser(res.data.user));  // Dispatch the user data
      localStorage.setItem('token', res.data.token);  // Optionally, store token
      navigate("/");  // Redirect to home page after signup
    } catch (err) {
      console.log("Error during signup:", err.response ? err.response.data : err.message);
    }
  };
  
  
  return (
    <div className="flex justify-center my-10">
      <div className="card bg-base-100 w-96 shadow-xl">
        <div className="card-body justify-center">
          <h2 className="card-title justify-center font-bold ">
            {isLog ? "Login" : "SignUp"}
          </h2>
          <div className="card-actions justify-center">
            {!isLog && (
              <div className="card bg-base-100 w-96 shadow-xl">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">First Name</span>
                  </div>
                  <input
                    value={firstName}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setFirstName(e.target.value)}
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
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>

                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">Age</span>
                  </div>
                  <input
                    value={age}
                    type="number"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setAge(e.target.value)}
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
                    onChange={(e) => setGender(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text">PhotoUrl</span>
                  </div>
                  <input
                    value={photoUrl}
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full max-w-xs"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>

              </div>
            )}

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Email id</span>
              </div>
              <input
                value={email}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <label className="form-control w-full max-w-xs">
              <div className="label">
                <span className="label-text">Password</span>
              </div>

              <input
                value={password}
                type="password"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <p
              className="cursor-pointer my-3"
              onClick={() => setLog((value) => !value)}
            >
              {isLog ? "New User? Signup Here" : "Existing User? Login Here"}
            </p>

            {/* Centered Button */}
            <div className="flex justify-center items-center w-full mt-8">
              <button
                className="btn btn-primary"
                onClick={isLog?handleLoginIn:handleSignup}
              >
                {isLog ? "Login" : "SignUp"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

