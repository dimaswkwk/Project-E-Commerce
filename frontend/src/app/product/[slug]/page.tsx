"use client"
import {useParams, useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import Image from 'next/image';
import {Product} from "@/src/types/types";
import {Navbar} from "@/src/components/navbar";

export default function ProductDetail() {
    const params = useParams();
    const slug = Array.isArray(params.slug)? params.slug : params.slug
    // ini use state buat menampilkan product
    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    // ini use state buat mengambil data dari product terus dimasukkan ke cart

    const router = useRouter()

    useEffect(() => {
        setLoading(true)
        setError("")
        const FetchSlug = async()  => {
            try {
                // fetch api
                const response = await fetch(`http://localhost:5000/api/product/${slug}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    credentials: "include"
                })
                // ketika sudah ada respon maka nanti akan ditampilkan datanya
                if (response.ok) {
                    const data = await response.json(); // diubah jadi json
                    setProduct(data)
                } else {
                    console.log('error to fetch product', response.statusText)
                 if (response.status === 401) {
                     alert('token expired silahkan login kembali')
                     window.location.href = '/login'
                 }
                }
            } catch (err) {
                const e = err as Error;
                setError(e.message)
                console.error('error fetching ', err)
            } finally {
                setLoading(false)
            }
        }
        FetchSlug()
    }, [slug]);
    const handleCartAndRedirect = async() => {
        // jika product tidak ada fungsi ini dibatalkan
        if (!product) return
        try {
            const res = await fetch(`http://localhost:5000/api/AddCart`,{
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                // mengambil data dari productnya, yang diambil cuman idnya
                // dan nanti quantity itu dari jumlah product yang akan daimbil, berarti cuman 1
                body: JSON.stringify({ id : product.id, quantity: 1 }),
                credentials: "include"
            })
            // ketika berhasil arahin ke cart
            if (res.ok) {
                router.push('/cart')
            } else {
                console.log('error adding to cart', res.statusText)
            }
            if (res.status === 401) {
                console.log('token expired silahkan login kembali')
                window.location.href = '/login'
                return
            }
        } catch (err) {
            const e = err as Error;
            setError(e.message)
            console.error('terjadi kesalahan', err)
        }
    }
    if (loading) return (
        <div style={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         height: '100vh'
        }}><Image src="http://localhost:5000/uploads/loading.gif"
        alt="http://localhost:5000/uploads/loading.gif"
        width={500}
        height={500}></Image>
        </div>
    );
    if (error) return <p>{error}</p>;
    if (!product) return <p>product not found</p>;
    return (

            <div className="flex-1">
                <Navbar />
        <div className="container mx-auto px-4 py-8">
            <div className="grid md:grid-cols-2 gap-8">
                <div className="flex relative justify-center">
                    {product.image ? (
                        <Image
                            src={product.image
                        ? `http://localhost:5000${product.image}`
                        : '/placeholder.png'
                    }
                            alt={product.name}
                            width={400}
                            height={400}
                            className="object-cover rounded-lg"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">No Image</span>
                        </div>
                    )}
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-2xl font-semibold text-green-600 mb-4">
                        Rp {""} {new Intl.NumberFormat("id-ID").format(product.price)}
                    </p>
                    <p className="text-gray-600 mb-4">
                        Stock: {product.stock} items
                    </p>
                    {product.store_name && (
                        <p className="text-gray-600 mb-4">
                            Toko: {product.store_name}
                        </p>
                    )}
                    {product.description && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-2">Description</h3>
                            <p className="text-gray-700">{product.description}</p>
                        </div>
                    )}
                       <div className="space-y-3">
                           <button onClick={handleCartAndRedirect} className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200" >
                               Add To Cart
                           </button>
                        <button className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition duration-200">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    );
}