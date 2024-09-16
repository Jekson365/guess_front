import { Box, Dialog, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useCreateUser } from "../hooks/users/useCreateUser";
import { CustomError } from "./errors/CustomError";

export const CreateUserPopUp = () => {
    const { createUser, errors, setErrors } = useCreateUser();
    const [user, setUser] = useState('');
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleUser = (event: any) => {
        const value = event.target.value;
        setUser(value);
    };

    const submitUser = async () => {
        try {
            createUser({ username: user })

        }
        catch (err) {
            throw err
        }
        if (errors.length < 1) {
            setErrors([])
            setOpen(false)
            setTimeout(()=> {
                window.location.reload()
            },500)
        }
    };
    useEffect(() => {
    }, [])
    return (
        <>
            {errors.length >= 1 ? (<>
                <CustomError />
            </>) : null}
            <Dialog open={open} onClose={handleClose}>
                <Box
                    style={{ background: "rgb(55,55,55)" }}
                    p={5}
                className='pop'
                >
                    <Stack
                        direction={'column'}
                        alignItems={'center'}
                        gap={'20px'}
                    >
                        <h4
                            style={{ color: "white" }}
                        >შეიყვანეთ იუზერი</h4>
                        <input
                            type="text"
                            placeholder="სახელი"
                            onChange={(e: any) => handleUser(e)}
                        />
                        <button
                            className="begin-button"
                            onClick={submitUser}
                        >შენახვა</button>
                    </Stack>
                </Box>
            </Dialog>
        </>
    );
};
