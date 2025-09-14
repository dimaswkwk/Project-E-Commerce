"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {useRouter} from "next/navigation";

export default function RegisterPage() {
    const [nama, setNama] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError("")
       try {
           const res = await fetch("http://localhost:5000/api/register", {
               method: "POST",
               headers: {
                   "Content-Type": "application/json",
               },
               body: JSON.stringify({nama,email,password})
           })
       const data = await res.json()
           if (!data) {
               throw new Error(data.message || " login gagal")
           }
           router.push("/login")
       } catch(err) {
         const e = err as Error;
         setError(e.message || " login gagal")
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
                                    id="name"
                                    type="text"
                                    placeholder="Your Full Name"
                                    onChange={(e => setNama(e.target.value))}
                                    required
                                />
                            </div>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="m@example.com"
                                    onChange={(e)=> setEmail(e.target.value)}
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
                                    type="password"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required />
                            </div>
                        </div>
                       </div>
                    </CardContent>
                    <CardFooter className="flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Loading...." : "Login"}
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