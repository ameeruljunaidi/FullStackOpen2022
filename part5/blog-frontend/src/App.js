import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./index.css";

const App = () => {
    const topBar = {
        padding: 5,
        backgroundColor: "gainsboro",
    };

    const padding = {
        padding: 5,
    };

    return (
        <Router>
            <div style={topBar}>
                <Link style={padding} to="/">
                    blogs
                </Link>
                <Link style={padding} to="/users">
                    users
                </Link>
                <LogoutButton />
            </div>

            <LoginForm />

            <h2>blog app</h2>

            <Routes>
                <Route path="/" element={<BlogList />} />
                <Route path="/users" element={<Users />} />
                <Route path="/users/:id" element={<User />} />
                <Route path="/blogs/:id" element={<BlogView />} />
            </Routes>

            <Notification />
        </Router>
    );
};

export default App;
