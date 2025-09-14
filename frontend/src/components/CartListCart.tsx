"use client"

import React, {ReactNode} from "react";

interface CartProps {
    image:ReactNode;
    header?: ReactNode;
    content?: ReactNode;

}
const ListCart: React.FC<CartProps> = ({image,header,content}) => {
    return (
            <div className="bg-white rounded-xl shadow-sm border">
                <div className="p-4 sm:p-6">
                    <div className="flex gap-4 sm:gap-6">
                    <div className="flex-shrink-0 ">
                    {image}
                </div>
               <div className="flex-1" >
               <div className="block sm:hidden">
                 {/* mobile layout */}
                   {header}
                   {content}
               </div>
              {/* Desktop layout */}
               <div className="hidden sm:block">
                   {header}
                   {content}
               </div>
              </div>
            </div>
         </div>
       </div>
    )
}


export default ListCart