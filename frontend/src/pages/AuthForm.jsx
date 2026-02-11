import React, { useState, useContext } from "react";
import { context } from "../context/ShopContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthForm = () => {
  const { setToken } = useContext(context);
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === "signup") {
        const res = await axios.post(
          "http://localhost:5000/api/users/signup",
          { username: name, email, password }
        );
        if (res.data.success) {
          toast.success(res.data.message);
          setMode("login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password }
        );
        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
          toast.success(res.data.message);
          navigate("/");
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-center min-h-screen bg-gray-100"
    >
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">
          {mode === "signup" ? "Signup" : "Login"}
        </h2>
        {mode === "signup" && (
          <input
            type="text"
            placeholder="Name"
            className="w-full mb-3 px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 px-4 py-2 border rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <p
          className="text-blue-500 cursor-pointer mb-4"
          onClick={() => setMode(mode === "login" ? "signup" : "login")}
        >
          {mode === "login" ? "Create account" : "Login here"}
        </p>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {mode === "login" ? "Login" : "Signup"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
