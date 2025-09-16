'use client'
import CardList from "../../components/CardList";
import { useState, useEffect } from "react";
import {Navbar} from "@/src/components/navbar";
import Image from "next/image";
import {products} from '../../types/types'
import Link from "next/link";
import CarouselAutoPlay from "@/src/components/Carousel"

export default function Products() {
    const [products, setProducts] = useState<products[]>([]);
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/product", {
                    method: "GET",
                    headers : {
                        "content-type": "application/json"
                    },
                    credentials:"include"
                })

                if (response.ok) {
                 const data = await response.json();
                 setProducts(data);
                } else {
                    console.error('error to fetch product', response.statusText)
                    if (response.status === 401) {
                      alert("Token not found!, silahkan login kembali");
                      window.location.href = "/login";
                    }
                }
            } catch (error) {
                console.error('error fetching product', error)
            }
        };
        fetchProduct()
    }, []);

    return (

            <div className="flex-1">
            <Navbar />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-1 md:gap-3 px-6 py-4 mx-auto max-w-7xl">
        {products.map((product) => {
            return (
                <Link href={`/product/${product.slug}`} key={product.id} >
            <CardList
             image = {
            <Image
                src={product.image
                    ? `http://localhost:5000${product.image}` : '/placeholder.png'
            }
                alt={product.name || "no image"}
                width={240}
                height={400}
                className="w-full h-60 object-cover"
            />
            }
            >
            <p className="truncate max-w-[220px]">{product.name}</p>
            <p>Rp{""} {new Intl.NumberFormat("id-ID").format(product.price)}</p>
            <p>{product.store_name}</p>
            </CardList>
        </Link>
            )
            })}

                </div>
                <div className="flex min-h-screen flex-col items-center justify-between p-24">
                    {/* Tampilkan carousel di sini */}
                    <div className="w-full max-w-5xl">
                        <CarouselAutoPlay />
                    </div>
                </div>
            </div>

    )
} 

