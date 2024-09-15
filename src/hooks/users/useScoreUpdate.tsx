import { axiosInstance } from "../../axiosInstance"

export const useScoreUpdate = () => {
    const updateScore = async (params: any) => {
        try {
            await axiosInstance.patch('/users/update_score', params)
        } catch (err) {
            throw err
        }

    }
    return { updateScore }
}