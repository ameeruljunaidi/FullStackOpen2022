import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Users from "./components/Users";
import User from "./components/User";

const App = () => (
    <Router>
        <LoginForm />
        <LogoutButton />

        <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
        </Routes>

        <Notification />
    </Router>
);

export default App;
