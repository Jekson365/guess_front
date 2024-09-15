import { useState } from "react"
import { axiosInstance } from "../../axiosInstance"

export const useUserIndex = () => {
    const [loading, setLoading] = useState(true)
    const [users, setUsers] = useState([])
    const fetchUsers = async () => {
        try {
            await axiosInstance.get("/users/users")
                .then((res) => {
                    setUsers(res.data)
                    setLoading(false)
                })
        }
        catch (err) {
            throw err
        }
    }
    return { fetchUsers, users, loading }
}