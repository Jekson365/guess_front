import { useState } from "react";
import { useCreateQuestion } from "../../hooks/useCreateQuestion";

const Admin = () => {
    const { newQuestion } = useCreateQuestion()
    const [data, setData] = useState({
        question: '',
        answers_attributes: [
            {
                answer: "",
                is_true: false,
                image: null
            },
            {
                answer: "",
                is_true: false,
                image: null
            }
        ]
    });

    // Handle question input change
    const handleQuestionChange = (e : any) => {
        setData(prevData => ({ ...prevData, question: e.target.value }));
    };

    // Handle answer changes
    const handleAnswerChange = (index : any, e : any) => {
        const { name, value } = e.target;
        const updatedAnswers = [...data.answers_attributes];
        updatedAnswers[index] = { ...updatedAnswers[index], [name]: value };
        setData(prevData => ({ ...prevData, answers_attributes: updatedAnswers }));
    };

    // Handle file upload
    const handleFileChange = (index : any, e : any) => {
        const file = e.target.files[0];
        const updatedAnswers = [...data.answers_attributes];
        updatedAnswers[index] = { ...updatedAnswers[index], image: file };
        setData(prevData => ({ ...prevData, answers_attributes: updatedAnswers }));
    };

    // Handle 'is true' checkbox
    const handleIsTrueChange = (index : any, e : any) => {
        const checked = e.target.checked;
        const updatedAnswers = [...data.answers_attributes];
        updatedAnswers[index] = { ...updatedAnswers[index], is_true: checked };
        setData(prevData => ({ ...prevData, answers_attributes: updatedAnswers }));
    };

    // Handle form submission
    const handleSubmit = () => {
        // Prepare form data
        const formData = new FormData();
        formData.append('question', data.question);
        data.answers_attributes.forEach((answer : any, index : any) => {
            formData.append(`answers_attributes[${index}][answer]`, answer.answer);
            formData.append(`answers_attributes[${index}][is_true]`, answer.is_true);
            if (answer.image) {
                formData.append(`answers_attributes[${index}][image]`, answer.image);
            }
        });

        // Make your API call here
        // Example: axios.post('/your-endpoint', formData)
        newQuestion(data)
    };

    return (
        <>
            <h3>Question</h3>
            <input
                type="text"
                placeholder="Question"
                value={data.question}
                onChange={handleQuestionChange}
            />
            <div>
                {data.answers_attributes.map((answer, index) => (
                    <div key={index}>
                        <input
                            type="file"
                            onChange={(e) => handleFileChange(index, e)}
                        />
                        <input
                            type="text"
                            name="answer"
                            placeholder={`Answer ${index + 1}`}
                            value={answer.answer}
                            onChange={(e) => handleAnswerChange(index, e)}
                        />
                        <label>
                            <input
                                type="checkbox"
                                checked={answer.is_true}
                                onChange={(e) => handleIsTrueChange(index, e)}
                            />
                            Is True
                        </label>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Save</button>
        </>
    );
};

export default Admin;
