import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formInputs, setFormInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("/user/signup", formInputs);
  };

  const handleOnChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex flex-col max-w-md mx-auto mt-[10rem]">
      <h1 className="text-center text-4xl mb-4">Sign up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          className="border border-gray-300 p-2 rounded-2xl"
          type="text"
          placeholder="your name"
          value={formInputs.name}
          name="name"
          onChange={handleOnChange}
        />
        <input
          className="border border-gray-300 p-2 rounded-2xl"
          type="email"
          placeholder="your@emil.com"
          value={formInputs.email}
          name="email"
          onChange={handleOnChange}
        />
        <input
          className="border border-gray-300 p-2 rounded-2xl"
          type="password"
          placeholder="password"
          value={formInputs.password}
          name="password"
          onChange={handleOnChange}
        />
        <button className="bg-primary text-white text-center py-2 rounded-2xl">
          Register
        </button>
        <div className="text-gray-800 text-center">
          Already have an account?{" "}
          <Link className="text-black underline" to="/login">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
