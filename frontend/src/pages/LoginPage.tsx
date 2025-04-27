import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useLoginMutation } from "../features/auth/authApi";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  const [login, { data, isLoading, isError, isSuccess, error: responseError }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (responseError && "data" in responseError) {
      const errorData = responseError.data as any;
      setError(errorData?.message || errorData || "Something went wrong");
    }

    if (data?.token && data?.user) {
      navigate("/");
    }
  }, [data, responseError, navigate]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    login({ email, password });
  };

  return (
    <div className="h-screen flex overflow-hidden">
  {/* Left Side */}
  <div className="w-1/2 h-full flex flex-col justify-center items-center">
    <div className="w-full max-w-md">
      {/* Emerald Colored Header */}
      <div className="bg-emerald-500 text-white py-4 rounded-t-md text-center">
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
      </div>

      {/* Form */}
      <form
        className="bg-white shadow-md rounded-b-md px-6 py-6"
        onSubmit={handleSubmit}
        method="POST"
      >
        <div className="mb-4">
          <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Email address"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Password"
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

          <Link to="/register" className="inline-block align-baseline font-bold text-sm text-emerald-500 hover:text-emerald-600">
            Register
          </Link>
        </div>

        {isError && <div className="text-red-500 text-sm mt-4">{error}</div>}
        {isSuccess && <div className="text-green-500 text-sm mt-4">Login successful! Redirecting...</div>}
      </form>
    </div>
  </div>

  {/* Right Side */}
  {/* Right Side */}
<div className="w-1/2 h-full flex items-center justify-center bg-emerald-50">
  <div className="text-center px-4">
    <h1 className="text-4xl font-bold text-emerald-500 mb-4 animate-pulse">
      Welcome to CRM for Freelancers
    </h1>
    <p className="text-gray-600 text-lg">
      Manage your clients and projects smartly!
    </p>
  </div>
</div>

</div>

  );
}
