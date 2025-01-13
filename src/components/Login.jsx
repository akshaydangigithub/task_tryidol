import React, { useContext, useState } from "react";
import { DataContext } from "../context/contextApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(DataContext);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.email !== "user@gmail.com") {
      toast.error("Invalid email");
      setLoading(false);
      return;
    }

    if (formData.password !== "user123") {
      toast.error("Invalid password");
      setLoading(false);
      return;
    }

    setIsAuthenticated(true);
    toast.success("Login success");
    navigate("/dashboard");
    setLoading(false);
    setFormData({ email: "", password: "" });
  };

  return (
    <div className="h-auto mb-10 flex items-center justify-center flex-col px-4 sm:px-6 lg:px-8">
      <h1 className="text-center font-bold text-lg mt-20">Welcome Back</h1>
      <div className="flex flex-col items-center mt-5 bg-gray-200 px-10 sm:px-20 rounded-md py-3">
        <h3 className="text-red-500">Use below credentials to login as user</h3>
        <p>
          Email: <b>user@gmail.com</b>
        </p>
        <p>
          Password: <b>user123</b>
        </p>
      </div>
      <form
        onSubmit={handleLogin}
        className="mx-auto w-full max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl shadow-sm shadow-black rounded-xl py-3 px-6 my-10"
      >
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            placeholder="********"
            name="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
          />
        </div>
        <button
          type="submit"
          className="mt-5 bg-black py-2 px-5 rounded-lg text-white hover:bg-black/90 transition duration-300"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
