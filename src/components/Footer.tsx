import React from 'react'

const Footer = () => {
  return (
     <footer className="bg-[#1E1E1E] text-gray-300 py-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6 md:px-12">
        
        {/* Left Side Logo & Text */}
        <div className="flex flex-col md:flex-row items-center md:space-x-6 text-center md:text-left">
          {/* Dummy Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
            <div>
              <h1 className="text-lg font-bold">MANIPAL</h1>
              <p className="text-xs">Academy of Higher Education</p>
            </div>
          </div>
          <div className="mt-2 md:mt-0">
            <h2 className="text-lg font-semibold">SOCIAL</h2>
            <p className="text-xs tracking-widest">MEDIA HUB</p>
          </div>
        </div>

        {/* Right Side Social Icons */}
        <div className="flex space-x-4 mt-4 md:mt-0">
          {/* Dummy Icons */}
          <div className="w-8 h-8 bg-gray-500 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-500 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-500 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-500 rounded-md"></div>
          <div className="w-8 h-8 bg-gray-500 rounded-md"></div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="border-t border-gray-600 mt-4 pt-4 text-center text-sm text-gray-400">
        ©2025 Manipal Academy of Higher Education
      </div>
    </footer>
  )
}

export default Footer
