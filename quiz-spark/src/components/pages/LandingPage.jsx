import React from "react";
import PrimaryButton from "../PrimeryButton";
import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 sm:px-12">
        <div className="flex items-center space-x-2">
          <div className="text-3xl text-green-600">❓</div>
          <span className="text-2xl font-bold text-gray-800">Quiz Spark</span>
        </div>        
        <PrimaryButton>Login</PrimaryButton>
      </nav>

      {/* Hero Section */}
      <main className="flex flex-col items-center justify-center pt-24 pb-16">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
          Learn <span className="text-green-600">10x Faster!</span>
        </h1>
        <p className="text-xl text-gray-600 mb-10">
          Unlock Your Potential with Personalized Quizzes
        </p>

        <PrimaryButton 
          className="px-8 py-3.5 text-lg" 
          onClick={() => navigate("/my-quizzes")}
        >
          Get Started Now!
        </PrimaryButton>
        <PrimaryButton className="px-8 py-3.5 text-lg m-5"
        onClick={() => navigate("/quiz-builder")}>
          Quiz Builder
        </PrimaryButton>
      </main>
    </div>
  );
}
