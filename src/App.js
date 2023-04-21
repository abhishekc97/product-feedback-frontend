import styles from "./App.module.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "../src/pages/Login/Login";
import Register from "./pages/Register/Register";
import { useSelector } from "react-redux";

function App() {
    const { isAuthenticated } = useSelector((state) => state.root);

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
