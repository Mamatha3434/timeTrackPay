
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
export default function Routing(){
    return (
        <div>
                <Router>
                <div className="App">
                    {/* <ul className="App-header">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/admin">
                                admin
                            </Link>
                        </li>
                        <li>
                            <Link to="/user">
                                user
                            </Link>
                        </li>
                    </ul> */}
                    <Routes>
                        <Route
                            exact
                            path="/"
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