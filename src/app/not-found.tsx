"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FiArrowLeft, FiHome, FiWifi, FiAlertTriangle } from "react-icons/fi";

const NotFoundPage = () => {
  const router = useRouter();
  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-indigo-950/40 to-purple-950/30 py-8 lg:py-0">
      <div className="container px-4 mx-auto">
        <div className="max-w-5xl mx-auto relative overflow-hidden bg-gray-900/40 border border-purple-500/20 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-950/30 transition-all duration-300">
          {/* Decorative Elements - softer glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-purple-600/10 to-fuchsia-500/10 rounded-full blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-fuchsia-500/10 to-purple-600/10 rounded-full blur-3xl -z-10"></div>

          {/* Circuit-like Lines - purple tones */}
          <div className="absolute inset-0 overflow-hidden opacity-15 pointer-events-none">
            <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-400/60 to-transparent animate-pulse"></div>
            <div
              className="absolute top-2/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent animate-pulse"
              style={{ animationDelay: "1.2s" }}
            ></div>
            <div
              className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuchsia-500/40 to-transparent animate-pulse"
              style={{ animationDelay: "2.4s" }}
            ></div>
            <div
              className="absolute left-1/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-400/60 to-transparent animate-pulse"
              style={{ animationDelay: "0.6s" }}
            ></div>
            <div
              className="absolute left-2/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-purple-500/50 to-transparent animate-pulse"
              style={{ animationDelay: "1.8s" }}
            ></div>
            <div
              className="absolute left-3/4 top-0 h-full w-px bg-gradient-to-b from-transparent via-fuchsia-500/40 to-transparent animate-pulse"
              style={{ animationDelay: "3s" }}
            ></div>
          </div>

          <div className="p-8 md:p-12 flex flex-col md:flex-row items-center">
            {/* Left Side - Error Code */}
            <div className="w-full md:w-1/2 text-center md:text-left mb-10 md:mb-0">
              <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6 bg-purple-950/60 text-purple-300 border border-purple-500/30">
                <FiAlertTriangle className="mr-2" />
                <span>404 Error</span>
              </div>

              <h1 className="text-6xl md:text-7xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-purple-500">
                Oops!
              </h1>

              <p className="text-2xl font-bold mb-3 text-gray-100">
                Page not found
              </p>

              <p className="text-base mb-10 max-w-md text-gray-400">
                The page you are looking for might have been removed, had its
                name changed, or is temporarily unavailable.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={handleGoBack}
                  className="group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 bg-gray-800/70 text-purple-300 border border-purple-500/30 hover:bg-gray-700/70 hover:border-purple-400/50 hover:shadow-lg hover:shadow-purple-900/30"
                >
                  <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform duration-300" />
                  Go Back
                </button>

                <Link
                  href="/"
                  className="group relative flex items-center justify-center px-6 py-3 rounded-xl text-sm font-medium font-medium transition-all duration-300 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white hover:from-purple-500 hover:to-fuchsia-500 shadow-md shadow-purple-900/40 hover:shadow-lg hover:shadow-purple-700/50"
                >
                  <FiHome className="mr-2 group-hover:scale-110 transition-transform duration-300" />
                  Return to Homepage
                </Link>
              </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="w-full md:w-1/2 flex justify-center">
              <div className="relative">
                {/* Animated Illustration */}
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-gray-800/30 border border-purple-500/20 flex items-center justify-center relative overflow-hidden">
                  {/* Animated Circles */}
                  <div className="absolute inset-0">
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full border-4 border-dashed animate-spin-slow opacity-30 border-purple-400/70"
                      style={{ animationDuration: "16s" }}
                    ></div>
                    <div
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border-4 border-dashed animate-spin-slow opacity-20 border-fuchsia-400/60"
                      style={{
                        animationDuration: "32s",
                        animationDirection: "reverse",
                      }}
                    ></div>
                  </div>

                  {/* 404 Text */}
                  <div className="relative z-10 text-center">
                    <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-300 to-gray-600/70">
                      404
                    </div>

                    {/* Disconnected Wifi Icon */}
                    <div className="mt-5 flex justify-center text-red-400/90">
                      <FiWifi size={56} className="animate-pulse" />
                      <div className="absolute top-1/2 left-1/2 w-14 h-1.5 bg-current transform -translate-x-1/2 rotate-45"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements - purple theme */}
                <div
                  className="absolute -top-5 -right-5 w-14 h-14 rounded-xl transform rotate-12 animate-float bg-gradient-to-br from-purple-500/20 to-fuchsia-500/20 backdrop-blur-lg border border-purple-400/30 shadow-md shadow-purple-900/20"
                  style={{ animationDelay: "0s" }}
                ></div>
                <div
                  className="absolute -bottom-7 -left-7 w-20 h-20 rounded-xl transform -rotate-12 animate-float bg-gradient-to-br from-fuchsia-500/20 to-purple-500/20 backdrop-blur-lg border border-fuchsia-400/30 shadow-md shadow-purple-900/20"
                  style={{ animationDelay: "1.2s" }}
                ></div>
                <div
                  className="absolute top-1/2 -right-10 w-12 h-12 rounded-full transform animate-float bg-gradient-to-br from-purple-400/25 to-fuchsia-400/25 backdrop-blur-lg border border-purple-300/30 shadow-sm shadow-purple-800/30"
                  style={{ animationDelay: "2.4s" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation keyframes */}
      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-12px) rotate(6deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }

        .animate-float {
          animation: float 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
