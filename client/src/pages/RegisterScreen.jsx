import React, { useState } from 'react';

const RegisterScreen = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register attempt:', formData);
    // Kayıt işlemleri burada yapılacak (API isteği vb.)
  };

  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col font-display bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark transition-colors duration-300 group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        
        {/* Header */}
        <header className="flex h-16 w-full shrink-0 items-center justify-between px-6 md:px-10 lg:px-20 border-b border-border-light dark:border-border-dark lg:border-none">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1, 'wght' 500" }}>eco</span>
            <p className="text-lg font-bold text-text-light dark:text-text-dark">Akıllı Beslenme</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="hidden sm:block text-sm text-subtle-light dark:text-subtle-dark">Already have an account?</p>
            <a className="cursor-pointer rounded-lg bg-primary/10 dark:bg-primary/20 px-4 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/20 dark:hover:bg-primary/30" href="#">
              Log In
            </a>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center py-10 lg:py-16">
          <div className="grid w-full max-w-6xl grid-cols-1 gap-8 px-6 md:px-10 lg:grid-cols-2 lg:gap-16">
            
            {/* Left Column: Image (Desktop Only) */}
            <div className="hidden flex-col items-center justify-center lg:flex">
              <div className="w-full max-w-md overflow-hidden rounded-2xl shadow-xl dark:shadow-gray-900/50 rotate-[-2deg] hover:rotate-0 transition-transform duration-500">
                <div 
                  className="aspect-square w-full bg-cover bg-center bg-no-repeat" 
                  role="img"
                  aria-label="Healthy food flat lay"
                  style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=2053&auto=format&fit=crop')" }}
                >
                  <div className="w-full h-full bg-black/10 dark:bg-black/20"></div>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="flex w-full flex-col justify-center">
              <div className="mx-auto w-full max-w-md">
                
                {/* Title Section */}
                <div className="mb-8 flex flex-col gap-3 text-center lg:text-left">
                  <p className="text-3xl font-black leading-tight tracking-[-0.033em] text-text-light dark:text-text-dark sm:text-4xl">
                    Start Your Smart Health Journey
                  </p>
                  <p className="text-base font-normal leading-normal text-subtle-light dark:text-subtle-dark">
                    Get custom meal and fitness plans designed just for you.
                  </p>
                </div>

                {/* Social Login Buttons */}
                <div className="flex flex-col gap-3">
                  <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-border-light bg-input-bg-light px-5 text-base font-bold text-text-light transition-colors hover:bg-gray-50 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:hover:bg-white/5">
                    {/* Google SVG Logo */}
                    <svg className="h-5 w-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span className="truncate">Continue with Google</span>
                  </button>
                  
                  <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border border-border-light bg-input-bg-light px-5 text-base font-bold text-text-light transition-colors hover:bg-gray-50 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:hover:bg-white/5">
                    {/* Apple SVG Logo */}
                    <svg className="h-5 w-5 dark:fill-white" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.64 4.65-1.64.9.06 1.83.33 2.62.9-1.25 1.7-1.41 4.19-.08 5.6 1.13 1.14 1.13 2.62 1.09 3.48-.44 2.16-1.55 3.52-3.36 3.89zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" fill="currentColor"/>
                    </svg>
                    <span className="truncate">Continue with Apple</span>
                  </button>
                </div>

                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border-light dark:border-border-dark"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-background-light dark:bg-background-dark px-2 text-subtle-light dark:text-subtle-dark">OR</span>
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Email</p>
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" 
                      placeholder="Enter your email address" 
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Password</p>
                    <input 
                      name="password"
                      type="password" 
                      value={formData.password}
                      onChange={handleInputChange}
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" 
                      placeholder="Create a password" 
                    />
                  </label>

                  <label className="flex flex-col">
                    <p className="pb-2 text-base font-medium leading-normal text-text-light dark:text-text-dark">Confirm Password</p>
                    <input 
                      name="confirmPassword"
                      type="password" 
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="form-input h-12 w-full rounded-lg border border-border-light bg-input-bg-light p-[15px] text-base text-text-light placeholder:text-subtle-light focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-input-bg-dark dark:text-text-dark dark:placeholder:text-subtle-dark dark:focus:border-primary" 
                      placeholder="Confirm your password" 
                    />
                  </label>

                  <div className="flex items-start gap-3 pt-2">
                    <input 
                      id="terms-checkbox" 
                      name="termsAccepted"
                      type="checkbox" 
                      checked={formData.termsAccepted}
                      onChange={handleInputChange}
                      className="mt-1 h-4 w-4 shrink-0 cursor-pointer rounded border-border-light text-primary focus:ring-primary dark:border-border-dark dark:bg-input-bg-dark" 
                    />
                    <label className="text-sm text-subtle-light dark:text-subtle-dark select-none" htmlFor="terms-checkbox">
                      By signing up, you agree to our <a className="font-medium text-primary underline hover:text-green-600 transition-colors" href="#">Terms of Service</a> and <a className="font-medium text-primary underline hover:text-green-600 transition-colors" href="#">Privacy Policy</a>.
                    </label>
                  </div>

                  <button className="mt-4 flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-primary px-5 text-base font-bold text-white shadow-md shadow-primary/20 transition-all hover:opacity-90 hover:shadow-lg active:scale-95">
                    <span className="truncate">Create Account</span>
                  </button>
                </form>

              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default RegisterScreen;