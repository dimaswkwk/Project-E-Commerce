"use client"
import {createContext, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import { UserContextType, usersType } from "../types/types"

interface context {
    children: ReactNode;
}

const userContext = createContext <UserContextType | null>(null)

export function UserProvider({children}: context) {
    const [users, setUser] = useState<usersType | null>(null)
    const [loading, setLoading] = useState(true)
    
        const fetchUsers= useCallback(async () => {
            const token = localStorage.getItem("access_token");
            if (!token) {
                setLoading(false)
                return;
            }
            try {
                const res = await fetch(`http://localhost:5000/api/me`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
             const userData = await res.json()
                if (res.ok) {
                    setUser(userData)
                }
            } catch (err) {
              console.error('fetching error',err)
            } finally {
                setLoading(false)
            }
        }, [])
 const refetchUser = () => {
        setLoading(true);
        fetchUsers()
    }

    useEffect(() => {
        fetchUsers()
    }, [fetchUsers]);
    return (
        <userContext.Provider value={{users, loading, setUser, refetchUser}}>
            {children}
        </userContext.Provider>
    )
}
export function useUser() {
    const context = useContext(userContext)
    if (context === null) {
        throw new Error('useUser must be defined within a User provider')
    }
    return context
}