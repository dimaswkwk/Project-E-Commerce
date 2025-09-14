'use client'
import React from "react"
import Link from "next/link";
import {HomeIcon, ShoppingCart, Package, Settings, Undo2} from "lucide-react";

type menuItems = {
    name: string,
    href: string,
    icon: React.ReactNode,
}

const Sidebar: React.FC = () => {
    const menus: menuItems[] = [
        {name: "Dashboard", icon: <HomeIcon/>, href:'/' },
        {name: "Shopping Cart", icon: <ShoppingCart/>, href:'/cart'},
        {name: "products", icon: <Package/>, href:'/product'},
        {name: "Settings", icon: <Settings/>, href: '/upload'},
        {name: "Back", icon: <Undo2/>, href:'/product'}
    ]
  return (
       <div className="flex">

      <div className="hidden md:flex md:w-64 h-screen flex-col p-4 bg-white text-black-100 rounded-br-lg">
          <h2 className="font-bold mb-5 text-center">my app test</h2>
          <nav className="flex flex-col space-y-2">
              {menus.map((menu) => (
                  <Link

                  key={menu.name}
                  href={menu.href}
                  className="flex items-center gap-3 p-4 rounded-md hover:bg-gray-500 transition "
                  >
                      {menu.icon}
                      <span>{menu.name}</span>
                  </Link>
              ))}
          </nav>
      </div>

          <div className="fixed bottom-0 left-0 right-0 gap-1 text-gray-100  bg-gray-700 flex justify-around item-center p-2 md:hidden shadow-lg ">
              {menus.map((menu, i) => (
                  <Link
                      key={i}
                      href={menu.href}
                      className="flex flex-col items-center gap-1 p-1 rounded-md hover:text-lime-400 transition "
                  >
                      {menu.icon}
                      <span className="text-xs">{menu.name}</span>
                  </Link>
              ))}
          </div>
</div>
  )
}
export default Sidebar