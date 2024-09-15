import { useState } from "react"
import { axiosInstance } from "../../axiosInstance"

export const useCreateUser = () => {
    const [errors, setErrors] = useState<any>([]);
    const createUser = async (params: any) => {
        try {
            await axiosInstance.post("/users/users", params,{ withCredentials: true })
        }
        catch (error : any) {
            if (error.response && error.response.data.errors) {
                setErrors(error.response.data.errors);
            } else {
                setErrors(['An unexpected error occurred']);
            }
        }
    }
    return { createUser, errors,setErrors }
}