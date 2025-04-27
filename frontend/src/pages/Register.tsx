import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRegisterMutation } from "../features/auth/authApi";

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [agreed, setAgreed] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [register, { data, isLoading, isError, isSuccess, error: responseError }] = useRegisterMutation();
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

    if (!agreed) {
      setError("You must agree to the terms and conditions");
      return;
    }

    register({ name, email, password });
  };

  const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAgreed(e.target.checked);
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Left Side */}
      <div className="w-1/2 h-full flex flex-col justify-center items-center">
        <div className="w-full max-w-md">
          {/* Emerald Colored Header */}
          <div className="bg-emerald-500 text-white py-4 rounded-t-md text-center">
            <h2 className="text-2xl font-bold">Create your account</h2>
          </div>

          {/* Form */}
          <form
            className="bg-white shadow-md rounded-b-md px-6 py-6"
            onSubmit={handleSubmit}
            method="POST"
          >
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={handleInputChange(setName)}
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Full Name"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email-address" className="block text-gray-700 text-sm font-bold mb-2">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                value={email}
                onChange={handleInputChange(setEmail)}
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Email address"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleInputChange(setPassword)}
                required
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Password"
              />
            </div>

            <div className="flex items-center mb-4">
              <input
                id="agreed"
                name="agreed"
                type="checkbox"
                checked={agreed}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
              />
              <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                I agree to the terms and conditions
              </label>
            </div>

            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                {isLoading ? "Signing up..." : "Sign Up"}
              </button>

              <Link to="/login" className="inline-block align-baseline font-bold text-sm text-emerald-500 hover:text-emerald-600">
                Already have an account?
              </Link>
            </div>

            {isError && <div className="text-red-500 text-sm mt-4">{error}</div>}
            {isSuccess && <div className="text-green-500 text-sm mt-4">Registration successful! Redirecting...</div>}
          </form>
        </div>
      </div>

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
