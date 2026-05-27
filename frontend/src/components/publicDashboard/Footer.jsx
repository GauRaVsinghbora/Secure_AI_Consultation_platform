import React from 'react'
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black">
      
      <div className="mx-auto w-full max-w-screen-xl 
                      px-4 sm:px-6 md:px-10 lg:px-20 
                      py-8 sm:py-10 lg:py-16">

        <div className="md:flex md:justify-between">

          {/* Logo */}
          <div className="mb-6 md:mb-0 flex justify-center md:justify-start">
            <Link to="/" className="flex items-center">
              <img
                src="logo1.png"
                className="mr-2 h-10 sm:h-12 md:h-14"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 text-center md:text-left">

            <div>
              <h2 className="mb-4 sm:mb-6 text-xs sm:text-sm font-bold text-white uppercase">
                Resources
              </h2>
              <ul className="text-gray-300 text-sm sm:text-base font-medium">
                <li className="mb-3 sm:mb-4">
                  <Link to="/" className="hover:underline">Home</Link>
                </li>
                <li>
                  <Link to="/about" className="hover:underline">About</Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 sm:mb-6 text-xs sm:text-sm font-bold text-white uppercase">
                Follow us
              </h2>
              <ul className="text-gray-300 text-sm sm:text-base font-medium">
                <li className="mb-3 sm:mb-4">
                  <a
                    href="https://github.com/gauravsinghbora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <Link to="/contact" className="hover:underline">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="mb-4 sm:mb-6 text-xs sm:text-sm font-bold text-white uppercase">
                Legal
              </h2>
              <ul className="text-gray-300 text-sm sm:text-base font-medium">
                <li className="mb-3 sm:mb-4">
                  <Link to="#" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="#" className="hover:underline">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <hr className="my-6 sm:my-8 border-gray-800" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <span className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            © 2026{" "}
            <a href="https://hiteshchoudhary.com/" className="hover:underline">
              _under_MedicalAIChatbot
            </a>{" "}
            . All Rights Reserved.
          </span>

          {/* Social icons */}
          <div className="flex justify-center sm:justify-end space-x-4 sm:space-x-5">

            <Link to="#" className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 21 16">
                <path d="M16.942 1.556..." />
              </svg>
            </Link>

            <Link to="#" className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 17">
                <path d="M20 1.892..." />
              </svg>
            </Link>

            <Link to="#" className="text-gray-400 hover:text-white">
              <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .333..." />
              </svg>
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
}