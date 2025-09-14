import React from "react";
import {useRouter} from "next/navigation";
import {useUser} from "@/src/context/UserContext";
import {LogOut} from "lucide-react"
const LogoutButton = () => {

    const router = useRouter()
    const { setUser } = useUser()

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setUser(null)
        router.push("/login")
    }

    return (

      <button className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
          <LogOut className="h-4 w-4"/>
          <span>Logout</span>
      </button>
    )
}
export default LogoutButton;