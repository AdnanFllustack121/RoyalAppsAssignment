import * as React from "react";
import { useNavigate } from "react-router-dom";

export default function Author() {
    const navigate = useNavigate();
    React.useEffect(() => {
        getAuthorDetails();
    }, []);

    const [getAuthor, setAuthor] = React.useState(null);

    return (
        <>
            <button onClick={() => navigate("/authors")}>Go back</button>
            <p>{getAuthor?.first_name}</p>
            <p>{getAuthor?.last_name}</p>
            <p>Books</p>
            <p>
                {
                    getAuthor?.books.map((book, index) => <>
                        <span>{book?.title}</span>
                        <button>Delete Book</button>
                    </>)
                }
            </p>
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
}