"use client"

import { Carousel, CarouselContent,CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import * as React from "react"
import AutoPlay from "embla-carousel-autoplay";

export default function CarouselAutoPlay() {

    const plugin = React.useRef(AutoPlay({ delay: 5000, stopOnInteraction: true}))

    return (
        <Carousel plugins={[plugin.current]} className="w-full" opts={ {loop: true }}>
            <CarouselContent>
                {/* ... Konten slide Anda di sini ... */}
         <CarouselItem>
             <div className="flex aspect-video items-center justify-center w-full p-6 bg-gray-200">
                 <span className="text-4xl font-semibold">Slide 1</span>
             </div>
         </CarouselItem>
         <CarouselItem>
           <div className="flex aspect-video items-center justify-center w-full p-6 bg-gray-300">
             <span className="text-4xl font-semibold">Slide 2</span>
            </div>
         </CarouselItem>
           <CarouselItem>
              <div className="flex aspect-video items-center justify-center w-full p-6 bg-gray-400">
                 <span className="text-4xl font-semibold">Slide 3</span>
               </div>
           </CarouselItem>
        </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>


    )
}

