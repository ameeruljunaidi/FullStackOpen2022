import { useSelector } from "react-redux";
import { ErrorNotification, SuccessNotification } from "./styles/Notification.styled";

const Notification = () => {
    const message = useSelector((state) => state.notification.message);
    const success = useSelector((state) => state.notification.success);

    if (message === "") {
        return;
    }

    if (success) {
        return <SuccessNotification>{message}</SuccessNotification>;
    } else {
        return <ErrorNotification>{message}</ErrorNotification>;
    }
};

export default Notification;
