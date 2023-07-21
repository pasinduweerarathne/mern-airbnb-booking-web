import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

const Login = () => {
  const [formInputs, setFormInputs] = useState({
    email: "",
    password: "",
  });
  const { user, setUser } = useContext(UserContext);

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/user/signin", formInputs);
      setUser(data);
      alert("login successfully");
    } catch (error) {
      alert("login failed");
    }
  };

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col max-w-md mx-auto mt-[10rem]">
      <h1 className="text-center text-4xl mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border border-gray-300 p-2 rounded-2xl"
          type="text"
          placeholder="your@emil.com"
          name="email"
          onChange={handleOnChange}
          value={formInputs.email}
        />
        <input
          className="border border-gray-300 p-2 rounded-2xl"
          type="password"
          placeholder="password"
          name="password"
          onChange={handleOnChange}
          value={formInputs.password}
        />
        <button className="bg-primary text-white text-center py-2 rounded-2xl">
          Login
        </button>
        <div className="text-gray-800 text-center">
          Don't have an account?{" "}
          <Link className="text-black underline" to="/signup">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
