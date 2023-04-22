import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function App() {
    const { isAuthenticated } = useSelector((state) => state.root);
    const dispatch = useDispatch();

    const [isTokenExists, setIsTokenExists] = useState(false);

    function handleRefresh() {
        if (
            localStorage.getItem("token") !== null &&
            localStorage.getItem("token") !== ""
        ) {
            setIsTokenExists(true);
            dispatch({ type: "login" });
        }
    }

    useEffect(() => {
        handleRefresh();
    }, []);

    return (
        <BrowserRouter>
            <div className={styles.App}>
                <Routes>
                    <Route
                        path="/"
                        element={<Home isAuthenticated={isAuthenticated} />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
