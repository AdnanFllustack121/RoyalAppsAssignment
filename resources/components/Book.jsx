import axios from "axios";
import * as React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function Book() {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem("token") || !localStorage.getItem("first_name") || !localStorage.getItem("last_name")) {
            navigate("/");
        } else {
            fetchAuthors();
        }
    }, []);

    const [getAuthors, setAuthors] = React.useState([]);
    const [getAuthorId, setAuthorId] = React.useState();

    const handleChange = (event) => {
        setAuthorId(event.target.value);
    };

    return <>
        <NavBar />
        <br />
        <br />
        <br />
        <Box component="form" onSubmit={handleSubmit} noValidate={false} sx={{ mt: 1, textAlign: "center" }}>
            <Button variant="outlined" color="error" onClick={() => navigate("/authors")}>
                Go Back
            </Button>
            <br />
            <br />
            <br />
            <br />
            <TextField
                margin="normal"
                required
                label="Book Title"
                name="title"
                autoFocus
            />
            <br />
            <TextField
                margin="normal"
                required
                label="Book description"
                name="description"
                autoFocus
            />
            <br />
            <TextField
                margin="normal"
                type="number"
                required
                label="Book pages"
                name="pages"
                autoFocus
            />
            <br />
            <InputLabel id="demo-simple-select-label">Select an Author</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getAuthorId}
                label="Authors"
                onChange={handleChange}
            >
                {
                    getAuthors.map((author, index) => {
                        return <MenuItem key={index} value={author?.id}>{`${author?.first_name} ${author?.last_name}`} </MenuItem>
                    })
                }
            </Select>
            <br />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create Book
            </Button>
        </Box>
    </>

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

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/create/book", {
                token: localStorage.getItem("token"),
                title: data.get("title"),
                date: new Date(),
                description: data.get("description"),
                pages: Number(data.get("pages")),
                author_id: getAuthorId
            });
            console.log("response", response);
            if (response?.data?.success) return alert("Book Created Successfully");
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}