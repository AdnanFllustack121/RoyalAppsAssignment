import axios from "axios";
import * as React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

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
    const [getTitle, setTitle] = React.useState("");
    const [getDescription, setDescription] = React.useState("");
    const [getFormat, setFormat] = React.useState("");
    const [getIsbn, setIsbn] = React.useState("");
    const [getPages, setPages] = React.useState();
    const [getAuthorId, setAuthorId] = React.useState();

    return <>
        <NavBar />
        <input placeholder="title" onChange={(e) => setTitle(e.target.value)} />
        <input placeholder="description" onChange={(e) => setDescription(e.target.value)} />
        <input placeholder="format" onChange={(e) => setFormat(e.target.value)} />
        <input placeholder="isbn" onChange={(e) => setIsbn(e.target.value)} />
        <input placeholder="pages" onChange={(e) => setPages(Number(e.target.value))} />
        <select onChange={(e) => setAuthorId(Number(e.target.value))}>
            {
                getAuthors.map((author, index) => {
                    return <option value={author?.id}>{author?.first_name}</option>
                })
            }
        </select>
        <button onClick={handleSubmit}>Create Book</button>
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

    async function handleSubmit() {
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/create/book", {
                token: localStorage.getItem("token"),
                title: getTitle,
                date: new Date(),
                description: getDescription,
                isbn: getIsbn,
                format: getFormat,
                pages: getPages,
                author_id: getAuthorId
            });
            console.log("response", response);
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}