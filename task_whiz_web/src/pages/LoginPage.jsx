import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const handleSignIn = (e) => {
    e.preventDefault();

    // Perform any authentication logic here

    // Save email to session storage
    sessionStorage.setItem("userEmail", email);

    // Redirect or perform any other actions after successful sign-in
    window.location.href = "/project/project-01";
  };

  return (
    <div className="w-screen flex justify-center items-center  p-10">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 bg-white p-10 rounded-lg text-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className=" text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Welcome to Aivy. <br />
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label
                for="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black placeholder:text-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6 p-2"
                  placeholder="example@gmail.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="mt-2">
              <div className="flex items-center justify-between">
                <label
                  for="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-black placeholder:text-gray-400 shadow-sm focus:ring-2 focus:ring-indigo-600 focus:border-transparent sm:text-sm sm:leading-6 p-2"
                  placeholder="********"
                />
              </div>
            </div>

            <div>
              <button
                className="flex w-full justify-center rounded-md bg-indigo-600  text-sm font-semibold text-black p-2"
                onClick={handleSignIn}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
