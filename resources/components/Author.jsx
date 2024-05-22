import * as React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

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
            <button onClick={() => navigate("/authors")}>Go back</button>
            <p>{getAuthor?.first_name}</p>
            <p>{getAuthor?.last_name}</p>
            <p>Books</p>
            <p>
                {
                    getAuthor?.books?.length == 0 ? "No Books Available for this Author" :
                        getAuthor?.books.map((book, index) => <>
                            <span>{book?.title}</span>
                            <button onClick={() => handleDelete(book?.id)}>Delete Book</button>
                        </>)
                }
            </p>
            {
                getAuthor?.books?.length == 0 && <button onClick={handleDeleteAuthor}>Delete this Author</button>
            }
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
            console.log("OKO", id);
            const response = await axios.post("http://127.0.0.1:8000/api/delete/book", {
                token: localStorage.getItem("token"),
                book_id: id
            });
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
                navigate("/authors");
            }
        } catch (error) {
            console.log("ERROR", error);
        }
    }
}