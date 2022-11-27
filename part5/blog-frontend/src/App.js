import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import "./index.css";
import { BlogList } from "./components/BlogList";
import { LogoutButton } from "./components/LogoutButton";

const App = () => (
    <div>
        <LoginForm />
        <LogoutButton />
        <BlogList />
        <Notification />
    </div>
);

export default App;
