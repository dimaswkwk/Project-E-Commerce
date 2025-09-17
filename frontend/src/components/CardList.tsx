"use client"
import { ReactNode } from "react"
interface CardListProps {
    image:ReactNode;
    children: ReactNode;
}

const CardList = ({image, children} : CardListProps) => {
    return (
      <div className="bg-white shadow-md  w-60 max-w-xs transform transition duration-300 hover:scale-105">
          <div className="w-full min-h-44">{image}</div>
          <div className="p-4 ">{children}</div>
    </div>
    )
}
export default CardList