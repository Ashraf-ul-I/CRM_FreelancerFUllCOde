import React, { useState } from "react";
import { useRegisterMutation } from "../features/auth/authApi";
import Input from "../components/common/Input";

interface FormData {
  name: string;
  email: string;
  password: string;
}

const RegisterForm = () => {
  const [register, { isLoading, error }] = useRegisterMutation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
 
   const getErrorMessage = () => {
    if (!error) return null;
    // Force cast to any to avoid typescript complaining
    const errData = error as { data?: { message?: string } };
    return errData?.data?.message || 'Login failed. Please try again.';
  };
  const validateForm = (): boolean => {
    let valid = true;
    const errors = { name: "", email: "", password: "" };

    if (!formData.name) {
      errors.name = "Name is required";
      valid = false;
    }
    if (!formData.email) {
      errors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
      valid = false;
    }
    if (!formData.password) {
      errors.password = "Password is required";
      valid = false;
    }

    setFormErrors(errors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const userData = {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        };
        const response = await register(userData).unwrap();
        console.log(response);
      } catch (err) {
        console.error(err);
      }
    }
  };

  // Password criteria check
  const passwordCriteriaMet = [
    formData.password.length >= 6, // At least 6 characters
    /[a-z]/.test(formData.password), // At least one lowercase letter
    /[A-Z]/.test(formData.password), // At least one uppercase letter
    /\d/.test(formData.password), // At least one number
    /[!@#$%^&*(),.?":{}|<>]/.test(formData.password), // At least one special character
  ];

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-center mb-4">Create an Account</h2>

      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Full Name"
          error={formErrors.name}
        />

        <Input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          error={formErrors.email}
        />

        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          error={formErrors.password}
        />

        <div className="mt-2 space-y-1">
          <ul>
            {[
              "At least 6 characters",
              "At least one lowercase letter",
              "At least one uppercase letter",
              "At least one number",
              "At least one special character",
            ].map((criteria, index) => (
              <li
                key={index}
                className={`flex items-center ${
                  passwordCriteriaMet[index] ? "text-green-600" : "text-gray-400"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-4 w-4 ${
                    passwordCriteriaMet[index] ? "text-green-600" : "text-gray-400"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span
                  className={`ml-2 ${
                    passwordCriteriaMet[index] ? "text-green-600" : "text-gray-400"
                  }`}
                >
                  {criteria}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500"
        >
          {isLoading ? "Registering..." : "Register"}
        </button>
        {error && (
          <div className="text-red-500 text-sm">
            {getErrorMessage()}
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterForm;
