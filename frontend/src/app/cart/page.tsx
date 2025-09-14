'use client'
import React, {useEffect, useState} from "react";
import {CartItems} from "../../types/types";
import ListCart from "@/src/components/CartListCart";
import Image from "next/image";
import {Navbar} from "@/src/components/navbar";
import {ShoppingBag, Trash2, Plus, Minus, ShoppingBasket} from "lucide-react";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import CardCart from "@/src/components/CardCartSubmit";



export default function CartPage () {
    const [cartItems, SetCartItems] = useState<CartItems[]>([]);
    const fetchCart = async () => {
        try {
            const token = localStorage.getItem("access_token")
            if (!token) {
                alert("No access token found")
                window.location.href = '/login'
            }
            const response = await fetch(`http://localhost:5000/api/cart`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                }
            })
            // ketika sudah merespon apinya nanti akan muncul datanya
            if (response.ok) {
                const dataCart = await response.json()
                SetCartItems(dataCart)
            } else {
                console.error("Could not fetch cart data")
                // kalau unauthorized / token habis
                if (response.status === 401) {
                    alert(`Unauthorized`)
                    window.location.href = '/login'
                }
            }
        } catch (error) {
            console.error('error fetching cart', error)
        }
    }
    useEffect(() => {
      fetchCart()
  }, [])

    const handleSubmit = async() => {
        const token = localStorage.getItem("access_token")
        const response = await fetch(`http://localhost:5000/api/order`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({

            })
        })
    }

    const handleTrash = async(productId:number) => {
        const token = localStorage.getItem("access_token")
        const response = await fetch(`http://localhost:5000/api/cart/delete`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                 product_id: productId,
            })
        })
        if (response.ok) {
            console.log("successfully deleting cart")
            fetchCart()
        }
    }

    const increaseCart = async(productId:number) => {
       const token = localStorage.getItem("access_token")
       const response = await fetch(`http://localhost:5000/api/cart/plus`, {
           method : 'POST',
           headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`
           },
           body: JSON.stringify({
               product_id: productId
           })
       })
        console.log("📤 Request product_id:", productId);
        console.log("📥 Response status:", response.status);

        console.log("response", response.status)
        if (response.ok) {
            console.log("📥 Response data:", response);
            console.log("data: ",cartItems)
            fetchCart()
            SetCartItems(cartItems)
        }
    }

    const decreaseCart = async(productId:number) => {
        const token = localStorage.getItem("access_token")
        const response = await fetch(`http://localhost:5000/api/cart/minus`, {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({
                product_id: productId
            })
        })
        if (response.ok) {
            fetchCart()
        }
    }
    const TotalHarga = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (cartItems.length === 0) {
        return (
            <div className=" h-screen flex flex-col">
                <Navbar/>
        <div className="flex-1 flex flex-col items-center justify-center h-screen text-center">

                 <ShoppingBag className=" h-24 w-24 text-gray-300 mb-4"/>
                    <button className=" white-text bg-lime-300 hover:bg-lime-100 transition-colors font-medium"></button>
                        <p className="mb-3 font-medium text-lg">Keranjang Kosong Silahkan Belanja Dulu</p>

            <Link href="/product"><Button className="w-35 h-10 hover:scale-105 "><ShoppingBasket className="w-8 h-8"/>Mulai Belanja</Button></Link>
        </div>
     </div>
        )
    }
    return (
        <div className="flex-1">
         <Navbar />
            <div className="space-y-4 mx-auto max-w-7xl pt-4">
                <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Keranjang Belanja</h1>
                <p className="text-gray-600">{cartItems.length} produk dalam keranjang</p>
            </div>
        {cartItems.map((cartItem) => (
               <ListCart
                   key={
                   cartItem.id
                   }
                   image = {
                   <Image
                      src={ cartItem.image ? `http://localhost:5000${cartItem.image}` : '/placeholder.png' }
                      width={250}
                      height={200}
                      alt="cart"
                      className="w-20 h-20 sm:w-32 sm:h-32  object-cover"
                   />
               }
                   header={
                   <div className="flex justify-between items-start">
                     <h3 className="text-lg font-semibold truncate pr-4">{cartItem.name}</h3>
                       <button onClick={() => {
                           handleTrash(cartItem.product_id)
                       }}><Trash2 className="hover:text-red-600 cursor-pointer"/></button>

                   </div>
                   }
                   content = {
                   <>
                       <div className="flex justify-between items-end">

                           {/* Bagian kiri: harga di atas, quantity di bawah */}
                           <div className="flex flex-col">

                               <span className="font-bold"> Rp {""} {new Intl.NumberFormat("id-ID").format(cartItem.price)}</span>

                           </div>

                           <div className="text-right space-y-1">
                               <div className="flex items-center gap-2">
                                   <button
                                       onClick={() => {
                                           decreaseCart(cartItem.product_id);
                                       }}
                                       className="p-2 rounded hover:bg-gray-100"
                                   >
                                       <Minus size={16} />
                                   </button>
                                   <span>{cartItem.quantity}</span>
                                   <button
                                       onClick={() => {
                                           increaseCart(cartItem.product_id);
                                       }}
                                       className="p-2 rounded hover:bg-gray-100"
                                   >
                                       <Plus size={16} />
                                   </button>
                               </div>
                               <div className="font-semibold">Rp {""} {new Intl.NumberFormat("id-ID").format(cartItem.price * cartItem.quantity)}</div>
                           </div>
                       </div>

                   </>
                   }

               />

        ))}
                <div className="fixed bottom-0 w-full">
                <div className="max-w-7xl ">
               <CardCart
                   header={
                       <div className="flex justify-between items-start">
                           <h3 className="text-lg font-semibold truncate pr-4">Total Barang : </h3>
                           <p className="font-medium">{cartItems.length}</p>

                       </div>
                   }
                   content = {
                       <>
                           <div className="flex justify-between items-end">

                               {/* Bagian kiri: harga di atas, quantity di bawah */}
                               <div className="flex flex-col">

                                   <span className="font-bold mb-8">Total Harga :</span>

                               </div>

                               <div className="text-right space-y-1 mb-8">
                                   <div className="font-semibold">Rp {""} {new Intl.NumberFormat("id-ID").format(TotalHarga)}</div>
                               </div>
                           </div>

                         <button className="w-4/5 bg-green-500 rounded-xl font-medium px-6 py-4 mx-auto block">
                             Order Now
                         </button>

                       </>
                   }
               />
                </div>
            </div>
    </div>
    </div>
    );
};