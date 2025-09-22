"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState} from "react";
import {useRouter} from "next/navigation";
import {RegisterProps} from "@/src/types/types";

export default function RegisterPage() {

    const [form, setForm] = useState<RegisterProps>({
        nama:"",
        email:"",
        password:"",
        image:null,
        onSubmit: ()=> {}
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
       setForm((prev)=> ({ ...prev, [name]:value }))
    }
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev)=> ({
            ...prev,
            image: e.target.files?.[0] || null
        }))
    }
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        setLoading(true)
        setError("")

       try {
            const formData = new FormData()
           formData.append("nama", form.nama)
           formData.append("email", form.email)
           formData.append("password", form.password)
           if (form.image) formData.append("image", form.image)

           const res = await fetch("http://localhost:5000/api/register", {
               method: "POST",
              body: formData
           })
           if (!res.ok) {
               throw new Error(`HTTP error! status: ${res.status}`);
           }
         const data = await res.json()
           console.log("success data registered",data)
           if (!data) {
               throw new Error(data.message || " register gagal")
           }
           router.push("/login")
       } catch(err) {
         const e = err as Error;
         setError(e.message || " register gagal")
       } finally {
            setLoading(false)
       }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle>Register Account</CardTitle>
                        <CardDescription>
                            Enter your
                            name, email, password below to create account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>

                        <div className="flex flex-col gap-6 pt-3">
                            <div className="grid gap-2">
                                <Label htmlFor="text">Full Name</Label>
                                <Input
                                    id="nama"
                                    name="nama"
                                    type="text"
                                    placeholder="Your Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="text">Your Image</Label>
                                    <Input
                                        id="image"
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        placeholder=""
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="grid gap-2 pb-4">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a
                                        href="#"
                                        className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    >
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required />
                            </div>
                        </div>
                       </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Loading...." : "Register"}
                        </Button>
                        <Button  variant="outline" className="w-full">
                            Sign In
                        </Button>
                    </CardFooter>
                </form>
                {error && (
                    <p>{error}</p>
                )}
            </Card>

        </div>
    )
}