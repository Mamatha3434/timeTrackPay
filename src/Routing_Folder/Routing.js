
import React, { Component } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,Switch
} from "react-router-dom";
import LoginPage from "../Login/LoginPage";
import AdminPage from "../admin_page/AdminPage";
import EmployeePage from "../employee_page/employeePage";
import { Navigate } from "react-router-dom";
export default function Routing(){
    return (
        <div>
                <Router>
                <div className="App">
                    <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                        <Route
                            exact
                            path="/login"
                            element={<LoginPage />}
                        ></Route>
                        <Route
                            exact
                            path="/admin"
                            element={<AdminPage />}
                        ></Route>
                        <Route
                            exact
                            path="/employee"
                            element={<EmployeePage />}
                        ></Route>
                    </Routes>
                </div>
            </Router>
        </div>
    )
}