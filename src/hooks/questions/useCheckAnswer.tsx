import { axiosInstance } from "../../axiosInstance"

export const useCheckAnswer = () => {
    const checkAnswer = async (params: any) => {
        let finalAns = false
        try {
            await axiosInstance.post("/questions/check", { answer_id: params })
                .then((res: any) => {
                    let result  = res.data.ans
                    if (result == 'false') {
                        finalAns = false
                    }
                    else {
                        finalAns = true
                    }
                })
        }
        catch (err) {
            throw err
        }
        return finalAns
    }
    return { checkAnswer }
}