import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";

// Define schema using Zod
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormInputs) => {
    console.log("Login Data:", data);
    // Handle login logic here
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: 'url("/bg.jpg")',
      }}
    >
      <div className="bg-white/60 p-8 rounded-lg shadow-lg max-w-md w-full">
        {/* <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Login
        </h2> */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full w-20 aspect-square flex justify-center items-center">
            <img src="/login.png" alt="" className="w-16  text-[#243B7C]" />
            {/* <svg
              className="h-8 w-8 text-[#243B7C]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg> */}
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-[#051c2e]">
              Email
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 block w-full p-2 border border-[#243B7C] rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold text-[#051c2e]">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 block w-full p-2 border border-[#243B7C]  rounded-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-[#243B7C] hover:bg-indigo-700 text-white font-semibold rounded-full shadow-md focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-sm text-[#0a2663]">
            Don’t have an account?{" "}
            <Link
              to="/signup"
              className="text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
