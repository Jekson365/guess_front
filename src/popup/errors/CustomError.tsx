import { Alert, Box } from "@mui/material"

export const CustomError = () => {
    return (
        <>
        <Box
            style={{
                position:"absolute",
                top:"20px",
                left:"20px",
                zIndex:"1000"
            }}
        >
            <Alert severity="success">მომხმარებელი არსებობს</Alert>
        </Box>
        </>
    )
}