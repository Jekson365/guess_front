import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import '../../styles/lead.scss';
import { useUserIndex } from "../../hooks/users/useUserIndex";
import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../../App";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link } from "react-router-dom";

const LeaderBoard = () => {
    const { fetchUsers, users, loading } = useUserIndex();
    const { user } = useContext(CurrentUserContext);

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box
            style={{
                maxWidth: "900px",
                margin: "50px auto"
            }}
            className='leadboard'
        >
            <Stack direction={'row'} alignItems={'flex-start'}>
                <Link to={'/main'}>
                    <div className="back-icon">
                        <ArrowBackIosIcon className="icon" />
                    </div>
                </Link>
            </Stack>
            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell className="color-white">სახელი</TableCell>
                            <TableCell className="color-white" align="right">ქულა</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={2} align="center">Loading...</TableCell>
                            </TableRow>
                        ) : (
                            users.map((e: any) => (
                                <TableRow key={e.id}>
                                    <TableCell component="th" scope="row" className={`color-white ${e.id === user ? 'current-color' : ''}`}>
                                        {e.username}
                                    </TableCell>
                                    <TableCell align="right" className={`color-white`}>
                                        {e.score}
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default LeaderBoard;
