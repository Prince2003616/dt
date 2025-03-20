"use client";
import React, { useState } from 'react';

// Form input component
const FormInput = ({ 
  label, 
  type, 
  id, 
  placeholder, 
  required = true,
  icon
}: { 
  label: string; 
  type: string; 
  id: string; 
  placeholder: string; 
  required?: boolean;
  icon: string;
}) => {
  return (
    <div className="mb-6 animate-fade-in-up">
      <label htmlFor={id} className="block text-gray-700 mb-2 font-medium">
        {label}
      </label>
      <div className="relative">
        <span className="absolute left-3 top-3 text-xl text-yellow-500">
          {icon}
        </span>
        <input
          type={type}
          id={id}
          name={id}
          placeholder={placeholder}
          required={required}
          className="w-full px-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-200 outline-none bg-white/80 backdrop-blur-sm hover:shadow-md"
        />
      </div>
    </div>
  );
};

// Button component
const Button = ({ text, type = "submit", onClick }: { text: string; type?: "button" | "submit"; onClick?: () => void }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
  >
    {text}
  </button>
);

// Main Authentication Component
export const Authentication = () => {
  const [showRegister, setShowRegister] = useState(false);
  const [registerStep, setRegisterStep] = useState(1);
  const totalSteps = 2;

  const nextStep = () => {
    if (registerStep < totalSteps) setRegisterStep(registerStep + 1);
  };

  const prevStep = () => {
    if (registerStep > 1) setRegisterStep(registerStep - 1);
  };

  const switchToRegister = () => {
    setShowRegister(true);
    setRegisterStep(1);
  };

  const switchToLogin = () => {
    setShowRegister(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Login Form */}
      {!showRegister && (
        <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-yellow-100 relative z-10 animate-fade-in">
          <div>
            <div className="mx-auto h-16 w-16 relative mb-6 animate-spin-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 blur-md opacity-30" />
              <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl">🌟</span>
              </div>
            </div>
            
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-800 animate-fade-in-down">
              Sign in to your account
            </h2>
            
            <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in-down">
              Access your Decision Tree Solutions dashboard
            </p>
          </div>
          
          <form className="mt-8 space-y-6">
            <div>
              <FormInput 
                label="Email or Username" 
                type="text" 
                id="emailOrUsername" 
                placeholder="your@email.com or username" 
                icon="👤"
              />
              
              <FormInput 
                label="Password" 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                icon="🔒"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="keep-signed-in"
                  name="keep-signed-in"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                />
                <label htmlFor="keep-signed-in" className="ml-2 block text-sm text-gray-700">
                  Keep me signed in
                </label>
              </div>

              <a href="#" className="text-sm font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
                Forgot your password?
              </a>
            </div>

            <Button text="Sign in" />
            
            <p className="mt-6 text-center text-sm text-gray-600 animate-fade-in-up">
              Don&apos;t have an account?{' '}
              <button 
                onClick={switchToRegister}
                className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                Sign up
              </button>
            </p>
          </form>
        </div>
      )}
      
      {/* Registration Form */}
      {showRegister && (
        <div className="max-w-md w-full space-y-8 bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-yellow-100 relative z-10 animate-fade-in">
          <div>
            <div className="mx-auto h-16 w-16 relative mb-6 animate-spin-slow">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-amber-500 blur-md opacity-30" />
              <div className="absolute inset-1 rounded-full bg-white flex items-center justify-center">
                <span className="text-3xl">✨</span>
              </div>
            </div>
            
            <h2 className="mt-6 text-center text-3xl font-bold text-gray-800 animate-fade-in-down">
              Create an account
            </h2>
            
            <p className="mt-2 text-center text-sm text-gray-600 animate-fade-in-down">
              Join Decision Tree Solutions and start your journey
            </p>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-6 animate-fade-in-down">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div key={index} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    registerStep > index ? "bg-yellow-500 text-white" : registerStep === index + 1 ? "bg-yellow-100 border-2 border-yellow-500 text-yellow-500" : "bg-gray-100 text-gray-400"
                  }`}>
                    {registerStep > index ? "✓" : index + 1}
                  </div>
                  {index < totalSteps - 1 && (
                    <div className={`w-10 h-1 mx-1 ${registerStep > index ? "bg-yellow-500" : "bg-gray-200"}`}></div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          <form className="mt-8 space-y-6">
            {registerStep === 1 && (
              <div className="animate-fade-in-up">
                <FormInput 
                  label="First Name" 
                  type="text" 
                  id="firstname" 
                  placeholder="John" 
                  icon="👤"
                />
                
                <FormInput 
                  label="Last Name" 
                  type="text" 
                  id="lastname" 
                  placeholder="Doe" 
                  icon="👤"
                />
                
                <FormInput 
                  label="Username" 
                  type="text" 
                  id="username" 
                  placeholder="johndoe" 
                  icon="🆔"
                />
                
                <FormInput 
                  label="Email Address" 
                  type="email" 
                  id="email" 
                  placeholder="your@email.com" 
                  icon="✉️"
                />
                
                <div className="mt-8">
                  <Button text="Continue" type="button" onClick={nextStep} />
                </div>
              </div>
            )}
            
            {registerStep === 2 && (
              <div className="animate-fade-in-up">
                <FormInput 
                  label="Password" 
                  type="password" 
                  id="password" 
                  placeholder="••••••••" 
                  icon="🔒"
                />
                
                <FormInput 
                  label="Confirm Password" 
                  type="password" 
                  id="confirm-password" 
                  placeholder="••••••••" 
                  icon="🔐"
                />
                
                <div className="flex items-center mt-6">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-yellow-500 focus:ring-yellow-400 border-gray-300 rounded"
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                    I agree to the <a href="#" className="text-yellow-600 hover:text-yellow-500">Terms</a> and <a href="#" className="text-yellow-600 hover:text-yellow-500">Privacy Policy</a>
                  </label>
                </div>
                
                <div className="flex gap-4 mt-8">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="w-1/3 py-3 px-4 bg-gray-100 text-gray-700 font-medium rounded-lg shadow-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Back
                  </button>
                  
                  <button
                    type="submit"
                    className="w-2/3 py-3 px-6 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            )}
            
            <p className="mt-6 text-center text-sm text-gray-600 animate-fade-in-up">
              Already have an account?{' '}
              <button
                onClick={switchToLogin}
                className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors"
              >
                Sign in
              </button>
            </p>
          </form>
        </div>
      )}
    </div>
  );
};

export default Authentication;