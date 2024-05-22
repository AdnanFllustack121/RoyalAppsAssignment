import * as React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

export default function Author() {
    const navigate = useNavigate();
    React.useEffect(() => {
        if (!localStorage.getItem("token") || !localStorage.getItem("first_name") || !localStorage.getItem("last_name")) {
            navigate("/");
        } else {
            getAuthorDetails();
        }
    }, []);

    const [getAuthor, setAuthor] = React.useState(null);

    return (
        <>
            <NavBar />
            <br />
            <Box validate sx={{ mt: 1, textAlign: "center" }}>
                <Button variant="outlined" color="error" onClick={() => navigate("/authors")}>
                    Go Back
                </Button>
                <br />
                <br />
                <br />
                <br />
                <br />
                {
                    getAuthor && <>
                        <Typography variant="button" display="block" gutterBottom>
                            Author Name: <b>{getAuthor?.first_name} {getAuthor?.last_name}</b>
                        </Typography>
                        <br />

                        <Typography variant="button" display="block" gutterBottom>
                            Author Birthday: <b>{getAuthor?.birthday.split("T")[0]}</b>
                        </Typography>
                        <br />

                        <Typography variant="button" display="block" gutterBottom>
                            Author Gender: <b>{getAuthor?.gender.toUpperCase()}</b>
                        </Typography>
                        <br />

                        <Typography variant="button" display="block" gutterBottom>
                            Author Place of Birth: <b>{getAuthor?.place_of_birth}</b>
                        </Typography>
                        <br />

                        <Typography variant="button" display="block" gutterBottom>
                            Author Books Count: <b>{getAuthor?.books?.length} Books</b>
                        </Typography>
                        <br />
                        {
                            getAuthor?.books?.length == 0 ?
                                <Button color="error" variant="contained" onClick={handleDeleteAuthor}>Delete This Author</Button> :
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Book Name</TableCell>
                                                <TableCell>Book Description</TableCell>
                                                <TableCell>Book Pages</TableCell>
                                                <TableCell>Book Release Date</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {getAuthor?.books.map((row, index) => (
                                                <TableRow
                                                    key={index}
                                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {index + 1}
                                                    </TableCell>
                                                    <TableCell>{row?.title}</TableCell>
                                                    <TableCell>{row?.description}</TableCell>
                                                    <TableCell>{row?.number_of_pages}</TableCell>
                                                    <TableCell>{row?.release_date.split("T")[0]}</TableCell>
                                                    <TableCell><Button variant="contained" color="error" onClick={() => handleDelete(row?.id)}>Delete this Book</Button></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                        }
                    </>
                }
            </Box>
        </>
    )

    async function getAuthorDetails() {
        try {
            const authorId = window.location.pathname.replace("/author/", "");
            const response = await axios.post("http://127.0.0.1:8000/api/get/author", {
                token: localStorage.getItem("token"),
                author_id: authorId
            });
            if (response.data.success) {
                setAuthor(response.data.data);
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    async function handleDelete(id) {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/delete/book", {
                token: localStorage.getItem("token"),
                book_id: id
            });
            if (response.data.success) {
                alert("Book Delete Successfully");
                await getAuthorDetails();
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }

    async function handleDeleteAuthor() {
        try {
            const authorId = window.location.pathname.replace("/author/", "");

            const response = await axios.post("http://127.0.0.1:8000/api/delete/author", {
                token: localStorage.getItem("token"),
                author_id: authorId

            });

            if (response.data.success) {
                alert("Author Deleted Successfully");
                navigate("/authors");
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}