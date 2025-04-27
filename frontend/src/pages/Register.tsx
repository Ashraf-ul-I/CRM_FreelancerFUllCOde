import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, FormEvent, ChangeEvent } from "react";
import { useRegisterMutation } from "../features/auth/authApi";


export default function Register() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");
    const [agreed, setAgreed] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const [register, { data, isLoading, isError, isSuccess, error: responseError }] = useRegisterMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (responseError && "data" in responseError) {
            setError((responseError.data as string) || "");
        }
        if (data?.token && data?.user) {
            navigate('/');
        }
    }, [data, responseError, navigate]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        
        register({
            name,
            email,
            password,
        });
        
    };

    const handleInputChange = (setter: (value: string) => void) => (e: ChangeEvent<HTMLInputElement>) => {
        setter(e.target.value);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setAgreed(e.target.checked);
    };

    return (
        <div className="grid place-items-center h-screen bg-[#F9FAFB]">
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Create your account
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="mt-8 space-y-6" method="POST">
                        <input type="hidden" name="remember" value="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="name" className="sr-only">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="Name"
                                    type="text"
                                    value={name}
                                    onChange={handleInputChange(setName)}
                                    autoComplete="name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    value={email}
                                    onChange={handleInputChange(setEmail)}
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={handleInputChange(setPassword)}
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>

                            {/* <div>
                                <label htmlFor="confirmPassword" className="sr-only">
                                    Confirm Password
                                </label>
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    value={confirmPass}
                                    onChange={handleInputChange(setConfirmPass)}
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-violet-500 focus:border-violet-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirm Password"
                                />
                            </div> */}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="agreed"
                                    name="agreed"
                                    type="checkbox"
                                    checked={agreed}
                                    onChange={handleCheckboxChange}
                                    className="h-4 w-4 text-violet-600 focus:ring-violet-500 border-gray-300 rounded"
                                />
                                <label htmlFor="agreed" className="ml-2 block text-sm text-gray-900">
                                    Agreed with the terms and condition
                                </label>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500"
                            >
                                Sign up
                            </button>
                        </div>
                        {
                            error && (
                                <div className="text-red-500 text-sm mt-2">
                                    {error}
                                </div>
                            )
                        }
                    </form>
                </div>
            </div>
        </div>
    );
}
