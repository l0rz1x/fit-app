import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login attempt:", formData);
    // Giriş işlemleri burada yapılacak
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300">
      <div className="flex h-full min-h-screen grow flex-row">
        {/* Left Pane: Visuals (Sadece geniş ekranda görünür) */}
        <div className="relative hidden w-1/2 flex-col items-center justify-center bg-cover bg-center lg:flex">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-yellow-accent/20 to-orange-accent/30 dark:from-primary/50 dark:via-yellow-accent/40 dark:to-orange-accent/50 backdrop-blur-[1px]"></div>
          <div
            className="w-full h-full bg-center bg-no-repeat bg-cover opacity-90"
            role="img"
            aria-label="Healthy lifestyle collage"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=2084&auto=format&fit=crop')",
            }}
            // Not: Tasarımdaki link kırık olabilir diye Unsplash'ten uygun bir görsel koydum.
          ></div>
        </div>

        {/* Right Pane: Form */}
        <div className="flex w-full flex-1 items-center justify-center p-4 lg:w-1/2">
          <div className="flex w-full max-w-md flex-col gap-8 px-4 py-10">
            {/* Header */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-3">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}
                >
                  spa
                </span>
                <h1 className="text-xl font-bold text-text-light dark:text-text-dark">
                  Akıllı Beslenme
                </h1>
              </div>
              <h2 className="text-4xl font-black leading-tight tracking-tight text-text-light dark:text-text-dark">
                Welcome Back
              </h2>
              <p className="text-subtle-light dark:text-subtle-dark">
                Ready to achieve your goals?
              </p>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Email Input */}
              <label className="flex flex-col w-full">
                <p className="text-base font-medium pb-2 text-text-light dark:text-text-dark">
                  Email or Username
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                  <div className="flex items-center justify-center pl-4 pr-2 border border-r-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-l-lg text-subtle-light dark:text-subtle-dark">
                    <span className="material-symbols-outlined">person</span>
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-none border border-l-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] rounded-r-lg text-base font-normal leading-normal"
                    placeholder="Enter your email"
                  />
                </div>
              </label>

              {/* Password Input */}
              <label className="flex flex-col w-full">
                <p className="text-base font-medium pb-2 text-text-light dark:text-text-dark">
                  Password
                </p>
                <div className="flex w-full flex-1 items-stretch rounded-lg group focus-within:ring-2 focus-within:ring-primary/50 transition-shadow">
                  <div className="flex items-center justify-center pl-4 pr-2 border border-r-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-l-lg text-subtle-light dark:text-subtle-dark">
                    <span className="material-symbols-outlined">lock</span>
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className="flex w-full min-w-0 flex-1 resize-none overflow-hidden text-text-light dark:text-text-dark focus:outline-none border-y border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark h-14 placeholder:text-subtle-light dark:placeholder:text-subtle-dark p-[15px] text-base font-normal leading-normal border-x-0"
                    placeholder="Enter your password"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="flex items-center justify-center pr-4 pl-2 border border-l-0 border-border-light dark:border-border-dark bg-input-bg-light dark:bg-input-bg-dark rounded-r-lg text-subtle-light dark:text-subtle-dark cursor-pointer hover:text-primary transition-colors"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </div>
                </div>
              </label>

              {/* Forgot Password Link */}
              <p className="text-sm font-normal leading-normal text-right text-subtle-light dark:text-subtle-dark underline hover:text-primary dark:hover:text-primary cursor-pointer transition-colors">
                Forgot Password?
              </p>

              {/* CTA & Sign Up Link */}
              <div className="flex flex-col gap-4 items-center mt-2">
                <button
                  type="submit"
                  className="flex w-full min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-green-600 transition-colors shadow-lg shadow-primary/20"
                >
                  <span className="truncate">Log In</span>
                </button>
                <p className="text-sm font-normal leading-normal text-center text-subtle-light dark:text-subtle-dark">
                  Don't have an account?{" "}
                  <a
                    className="font-bold underline text-primary hover:text-orange-accent transition-colors"
                    href="/register"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
