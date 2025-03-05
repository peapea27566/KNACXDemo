"use client"
import { useState } from "react";
import { CartIcon } from "./CartIcon";
import { ThemeSwitchIcon } from "./ThemeSwitchIcon";
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="shadow-lg bg-white/10">
      <div className="container mx-auto flex justify-between items-center py-4 px-2">
      
        <div className="flex items-center sm:hidden">
          <button onClick={toggleDrawer} className="text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round" 
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex space-x-4 hidden sm:flex">
          <a href="/" className="hover:text-gray-300">Home</a>
          <a href="/product" className="hover:text-gray-300">Product</a>
          <a href="/crud" className="hover:text-gray-300">CRUD</a>
          <a href="/reactwindow" className="hover:text-gray-300">React-window</a>
          <a href="/pagination" className="hover:text-gray-300">Pagination</a>
          <a href="/inscroll" className="hover:text-gray-300">InfiniteScroll</a>
        </div>

      
        <div className="flex space-x-4 items-center">
          <CartIcon />
          <ThemeSwitchIcon />
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "-translate-x-full"} sm:hidden`}
        onClick={toggleDrawer}
      >
        <div
          className="w-64 bg-white p-4 h-full text-black"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the drawer
        >
          <div className="flex flex-col space-y-4">
            <a href="/" className="hover:text-gray-300">Home</a>
            <a href="/product" className="hover:text-gray-300">Product</a>
            <a href="/crud" className="hover:text-gray-300">CRUD</a>
            <a href="/reactwindow" className="hover:text-gray-300">React-window</a>
            <a href="/pagination" className="hover:text-gray-300">Pagination</a>
            <a href="/inscroll" className="hover:text-gray-300">InfiniteScroll</a>
          </div>
        </div>
      </div>
    </div>
  );
};
