import { useState } from "react"
import { axiosInstance } from "../axiosInstance"

export const useQuestionIndex = () => {
    const [loading, setLoading] = useState(true)
    const [questions, setQuestions] = useState<any>(null)
    const [isLast, setIsLast] = useState(false)

    const fetchQuestions = async (id: number) => {
        try {
            const res = await axiosInstance.get(`/questions/questions/${id}`)
            console.log(res.data)
            setQuestions(res.data.question)
            setIsLast(res.data.is_last)
            setLoading(false)
        } catch (err) {
            throw err
        }
    }

    return { questions, fetchQuestions, loading, isLast }
}
