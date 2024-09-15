import { Alert, Box, Dialog } from "@mui/material"
import zIndex from "@mui/material/styles/zIndex"

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