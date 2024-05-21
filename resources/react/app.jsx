import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../components/SignIn';
import Authors from '../components/Authors';
import Author from '../components/Author';
import Book from '../components/Book';


ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="authors" element={<Authors />} />
            <Route path="author/:id" element={<Author />} />
            <Route path="createbook" element={<Book />} />
        </Routes>
    </BrowserRouter>
);