import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import LogoutButton from "./components/LogoutButton";
import "./index.css";

const App = () => (
    <div>
        <LoginForm />
        <LogoutButton />
        <BlogList />
        <Notification />
    </div>
);

export default App;
