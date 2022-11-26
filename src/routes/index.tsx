import { Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";

export default function RoutesMain() {

    return (
        <Routes>
            <Route path="/" element={<Navigate to={"/login"}/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/register" element={<Register />}/>
            <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    )
}