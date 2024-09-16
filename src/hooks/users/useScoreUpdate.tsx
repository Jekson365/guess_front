// @ts-ignore
import { axiosInstance } from "../../axiosInstance"

export const useScoreUpdate = () => {
    const updateScore = async (params: any) => {
        try {
            await axiosInstance.patch('/users/update_score', params,{
                headers: {
                    'X-API-KEY': process.env.REACT_APP_API_KEY
                }
            })
        } catch (err) {
            throw err
        }

    }
    return { updateScore }
}