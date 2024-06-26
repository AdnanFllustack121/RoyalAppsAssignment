import * as React from "react";
import axios from "axios";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import NavBar from "./NavBar";

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function Authors() {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!localStorage.getItem("token") || !localStorage.getItem("first_name") || !localStorage.getItem("last_name")) {
            navigate("/");
        } else {
            fetchAuthors();
        }
    }, []);

    const [getAuthors, setAuthors] = React.useState([]);

    return (
        <>
            <NavBar />
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Author Name</TableCell>
                            <TableCell>Author Gender</TableCell>
                            <TableCell>Author Birthday / Place of Birth</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getAuthors.map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {index + 1}
                                </TableCell>
                                <TableCell>{`${row.first_name} ${row.last_name}`}</TableCell>
                                <TableCell>{row.gender.toUpperCase()}</TableCell>
                                <TableCell>{`${row.birthday.split("T")[0]} / ${row.place_of_birth}`}</TableCell>
                                <TableCell><Button variant="contained" onClick={() => navigate(`/author/${row.id}`)}>View Details</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )

    async function fetchAuthors() {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/get/authors", {
                token: localStorage.getItem("token")
            });

            if (response.data.success) {
                setAuthors(response.data.data.items);
            }

        } catch (error) {
            console.log("ERROR", error);
        }
    }
}