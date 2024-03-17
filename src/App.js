import logo from './logo.svg';
import './App.css';
import LoginPage from './Login/LoginPage';
import AdminPage from './admin_page/AdminPage';
import EmployeePage from './employee_page/employeePage';
import Routing from './Routing_Folder/Routing';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,Switch
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      {/* <LoginPage > </LoginPage> */}

       <Routing></Routing>
    </div>
  );
}

export default App;
