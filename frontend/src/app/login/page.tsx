"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"
import {useUser} from "@/src/context/UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const {refetchUser} = useUser()
    const router = useRouter();

    // check apakah user sudah login sebelumnya
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
         router.push("/product"); // redirect ke product kalau sudah login, pakai router nextjs
        }
    }, [router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            // request ke backend
            const res = await fetch("http://localhost:5000/api/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
                credentials: "include"
            })
            // rubah responnya menjadi json
            const data = await res.json();

            if (!res.ok) {
            throw new Error(data.message || " login gagal");
            }
            // simpan token/cookies di localstorage
            // localStorage.setItem("access_token", data.access_token);
            console.log(data.message);
            refetchUser();
            // dan langsung diarahin ke product kalau berhasil login
         router.push("/product");
        } catch (err) {
            const e = err as Error;
            setError(e.message);
        } finally {
            // dan akhirnya kalau berhasil loading.. jadi hilang
          setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-full max-w-sm">
                <form onSubmit={handleSubmit}>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your
                        email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>

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
            </Card>
            {error && (
                <p>{error}</p>
            )}
        </div>
        )
    }
