import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import Users from "./components/Users";
import User from "./components/User";
import BlogView from "./components/BlogView";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Footer, Navigation, Page } from "./components/styles/GeneralStyles.styled";

const App = () => {
    const padding = {
        padding: 5,
    };

    return (
        <Page>
            <Router>
                <Navigation>
                    <div>
                        <Link style={padding} to="/">
                            blogs
                        </Link>
                        <Link style={padding} to="/users">
                            users
                        </Link>
                        <LogoutButton />
                    </div>
                </Navigation>

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
            <Footer>
                <em>Blog app, AJ Junaidi</em>
            </Footer>
        </Page>
    );
};

export default App;
