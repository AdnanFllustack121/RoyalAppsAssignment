import ReactDOM from 'react-dom/client';
import Main from './Main';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from '../components/SignIn';
import Authors from '../components/Authors';


ReactDOM.createRoot(document.getElementById('app')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="authors" element={<Authors />} />
        </Routes>
    </BrowserRouter>
);