import { useState } from "react"
import { axiosInstance } from "../axiosInstance"

export const useCreateQuestion = () => {
    const [uploaded, setUploaded] = useState<boolean>(false)
    const newQuestion = async (payload: any) => {
        try {
            await axiosInstance.post("/questions/questions", { question: payload },
                {
                    headers: {
                        'Content-Type':'multipart/form-data'
                    }
                }
            )
            window.location.reload()
            setUploaded(uploaded)

        } catch (err) {
            throw err
        }
    }
    return { newQuestion, uploaded }
}