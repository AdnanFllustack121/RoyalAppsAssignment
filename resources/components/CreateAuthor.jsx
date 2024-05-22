import axios from "axios";
import * as React from "react";
import NavBar from "./NavBar";
import { useNavigate } from "react-router-dom";

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

    return <>
        <NavBar />
        <input placeholder="first name" onChange={(e) => setFirstName(e.target.value)} />
        <input placeholder="last name" onChange={(e) => setLastName(e.target.value)} />
        <input type="date" placeholder="birthday" onChange={(e) => setBirthday(e.target.value)} />
        <input placeholder="biography" onChange={(e) => setBio(e.target.value)} />
        <input placeholder="Gender" onChange={(e) => setGender(e.target.value)} />
        <input placeholder="place of birth" onChange={(e) => setBirthPlace(e.target.value)} />
        <button onClick={handleSubmit}>Create Author</button>
    </>

    async function handleSubmit() {
        try {

            console.log("OKOK")
            // const response = await axios.post("http://127.0.0.1:8000/api/create/book", {
            //     token: localStorage.getItem("token"),
            //     title: getTitle,
            //     date: new Date(),
            //     description: getDescription,
            //     isbn: getIsbn,
            //     format: getFormat,
            //     pages: getPages,
            //     author_id: getAuthorId
            // });
            // console.log("response", response);
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}