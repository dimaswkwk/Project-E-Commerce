'use client'
import React, {useState} from "react";
import {User, Search, ShoppingCart, ChevronDown, Settings, Store} from "lucide-react"
import {useUser} from "@/src/context/UserContext";
import Link from "next/link";
import LogoutButton from "@/src/components/LogoutButton";

export const Navbar: React.FC = () => {
  const {users, loading} = useUser()

  const [isDropdownOpen, setDropdownOpen] = useState(false);
  return (
      <nav className="bg-white px-6 py-4 flex items-center w-full
            shadow-[0_12px_10px_-8px_rgba(0,0,0,0.25)]
            hover:shadow-[0_15px_11px_-10px_rgba(0,0,0,0.35)]
            transition-shadow duration-300">
          <h1 className ="text-xl hidden md:block"> Toko Mas Dimas</h1>
          <h1 className="md:hidden"></h1>

          <div className="relative flex-1 mx-6">

              <input
                  type="text"
                  placeholder="Search..."
                  className=" w-full border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          </div>

          <div className="flex items-center space-x-4 ml-auto ">
              {/* Shopping Cart */}

              <div className="relative border-r border-gray-100 pr-3 grid ">
                  <Link href="/cart">
                      <span><ShoppingCart className="h-6 w-6 text-gray-600  hover:text-green-600 cursor-pointer" /></span>
                  </Link>

              </div>
              <div>
              <Link href="/store">
                  <span><Store className="h-6 w-6 text-gray-600 hover:text-green-600 cursor-pointer" /></span>
              </Link>
              </div>
              {/* User Section */}
              <div className="flex items-center text-sm text-gray-600">
                  {loading ? (
                      <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600"></div>
                          <p>Loading...</p>
                      </div>
                  ) : users ? (
                      <div className="flex items-center space-x-3">
                          <p className="font-medium">{users.nama}</p>

                          {/* User Dropdown */}
                          <div className="relative">
                              <button
                                  className="flex items-center space-x-2 p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                                  onClick={() => setDropdownOpen(!isDropdownOpen)}
                              >
                                  <User className="h-5 w-5 text-gray-700" />
                                  <ChevronDown
                                      // is dropdown open kalau dipencet rotate 90, kalau dipencet lagi kembali ke semula
                                      className={`h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? 'rotate-90' : 'rotate-0'}`}
                                  />
                              </button>

                              {isDropdownOpen && (
                                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-10">

                                          <a className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100">
                                              <Settings className="h-4 w-4" />
                                              <span>Settings</span>
                                          </a>

                                      <div className="border-t border-gray-200 my-1"></div>
                                          <LogoutButton />
                                  </div>
                              )}
                          </div>


                      </div>
                  ) : (
                      <Link href="/login">
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                              Login
                          </button>
                      </Link>
                  )}
              </div>
          </div>
      </nav>
  );
}

