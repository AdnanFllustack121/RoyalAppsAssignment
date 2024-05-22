import axios from "axios";
import * as React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, MenuItem, Select, TextField } from "@mui/material";

export default function CreateAuthor() {
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!localStorage.getItem("token") || !localStorage.getItem("first_name") || !localStorage.getItem("last_name")) {
            navigate("/");
        }
    }, []);

    const [getFirstName, setFirstName] = React.useState("");
    const [getLastName, setLastName] = React.useState("");
    const [getBirthday, setBirthday] = React.useState("");
    const [getBio, setBio] = React.useState("");
    const [getGender, setGender] = React.useState("");
    const [getBirthPlace, setBirthPlace] = React.useState("");

    const handleChange = (event) => {
        setGender(event.target.value);
    };

    return <>
        <NavBar />
        <br />
        <br />
        <br />
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, textAlign: "center" }}>
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
                label="Author First Name"
                name="first_name"
                autoFocus
            />
            <br />
            <TextField
                margin="normal"
                required
                label="Author Last Name"
                name="last_name"
                autoFocus
            />
            <br />
            <TextField
                margin="normal"
                required
                label="Author Birth Place"
                name="birth_place"
                autoFocus
            />
            <br />
            <InputLabel id="demo-simple-select-label">Select Day of Birth</InputLabel>
            <TextField
                margin="normal"
                type="date"
                required
                name="birthday"
                autoFocus
            />
            <br />
            <InputLabel id="demo-simple-select-label">Gender</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={getGender}
                label="Genders"
                onChange={handleChange}
            >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
            </Select>
            <br />
            <Button
                type="submit"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
                Create Author
            </Button>
        </Box>
    </>

    async function handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/create/author", {
                token: localStorage.getItem("token"),
                first_name: data.get("first_name"),
                last_name: data.get("last_name"),
                birthday: data.get("birthday"),
                place: data.get("birth_place"),
                gender: getGender
            });
            console.log("response", response);
            if (response?.data?.success) return alert("Author Created Successfully");
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}