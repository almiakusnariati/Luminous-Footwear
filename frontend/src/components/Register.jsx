import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    role: "USER", 
  });

  const [errMsg, setErrMsg] = useState("");
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, username, password, role } = formData;

    try {
      const response = await fetch("http://localhost:8080/api/auth/sign-up", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        setShowSuccess(true);
        setErrMsg("Successfully registered");
        navigate("/login");
      } else {
        setShowError(true);
        setErrMsg(data.message);
      }
    } catch (error) {
      setShowError(true);
      setErrMsg(`Server error! ${error}`);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-10">
          <h2 className="text-4xl font-bold mb-8 text-center">Sign Up</h2>
          {showError && (
            <div className="alert bg-red-200 text-red-800 p-4 rounded mb-4">
              <p className="danger">
                <span className="font-bold">Alert!</span> {errMsg}
              </p>
            </div>
          )}
          {showSuccess && (
            <div className="alert bg-green-200 text-green-800 p-4 rounded mb-4">
              <p className="success">
                <span className="font-bold">Success!</span> {errMsg}
              </p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="email@example.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="username"
                value={formData.username}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-gray-700">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                <option value="USER">User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full mt-6 bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-600 transition duration-300"
            >
              Sign Up
            </button>
          </form>
          <div className="mt-6 text-center">
            <Link to="/user/products/login" className="text-gray-800 hover:underline">
              Already have an account? Login
            </Link>
          </div>
        </div>
      </div>
      <div className="w-1/2 bg-gray-800 flex items-center justify-center">
        <img src="/image/football_player_PNG78.png" alt="" />
      </div>
    </div>
  );
}
