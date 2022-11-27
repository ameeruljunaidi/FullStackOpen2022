import "../index.css";
import { useSelector } from "react-redux";

const Notification = () => {
    const message = useSelector((state) => state.notification.message);
    const success = useSelector((state) => state.notification.success);

    if (message === "") {
        return;
    }

    if (success) {
        return <div className="success">{message}</div>;
    } else {
        return <div className="error">{message}</div>;
    }
};

export default Notification;
