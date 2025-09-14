"use client"

import React, {ReactNode} from "react";

interface CartChildren {
 header: ReactNode;
 content: ReactNode;
}
const CardCart: React.FC<CartChildren> = ({header, content}) => {
   return (
       <div className="bg-white rounded-t-lg shadow-m border ">
           <div className="p-4 sm:p-6">
               <div className="flex gap-4 sm:gap-6">
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
export default CardCart;