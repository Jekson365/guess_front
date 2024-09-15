import { useState } from "react"
import { axiosInstance } from "../../axiosInstance"

export const useUserCookie = () => {
    const [user, setUser] = useState<any>({})
    const getCookie = async () => {
        try {
            await axiosInstance.get("/users/get_cookie",{ withCredentials: true })
                .then((res) => {
                    setUser(res.data)
                })
        }
        catch (err) {
            throw err
        }
    }
    return { getCookie, user }
}