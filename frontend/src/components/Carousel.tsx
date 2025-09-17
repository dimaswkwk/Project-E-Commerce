"use client"

import { Carousel, CarouselContent,CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import * as React from "react"
import AutoPlay from "embla-carousel-autoplay";
import Image from "next/image";

export default function CarouselAutoPlay() {

    const plugin = React.useRef(AutoPlay({ delay: 5000, stopOnInteraction: true}))

    return (

        <Carousel plugins={[plugin.current]} className="w-full max-w-6xl mx-auto group relative" opts={ {loop: true }}>
            <CarouselContent>
                {/* ... Konten slide Anda di sini ... */}
         <CarouselItem>
             <div className="relative w-full h-[250px] md:h-[300px] lg:h-[200px]">
                <Image
                    src={
                     `http://localhost:5000/uploads/RobloxScreenShot20240904_222708936.png`
                    }
                     fill
                     alt={'roblok 1'}
                     className="object-cover rounded-lg"
                />
             </div>
         </CarouselItem>
         <CarouselItem>
             <div className="relative w-full h-[250px] md:h-[300px] lg:h-[200px]">
                 <Image
                     src={
                         `http://localhost:5000/uploads/pms_1670469363.59261566!800x800!85.png`
                     }
                     fill
                     alt={'roblok 2'}
                     className="object-cover rounded-lg"
                 />
             </div>
         </CarouselItem>
           <CarouselItem>
               <div className="relative w-full h-[250px] md:h-[300px] lg:h-[200px]">
                   <Image
                       src={
                           `http://localhost:5000/uploads/hore.png`
                       }
                       fill
                       alt={'roblok 3'}
                       className="object-cover rounded-lg"
                   />
               </div>
           </CarouselItem>
        </CarouselContent>
            <CarouselPrevious className=" opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out left-2"/>
            <CarouselNext className=" opacity-0 group-hover:opacity-80 transition-opacity duration-300 ease-in-out right-2"/>
        </Carousel>


    )
}

