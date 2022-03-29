import { Store } from "react-notifications-component";

function Notification(title, message, type, duration){
    Store.addNotification({
        title: title,
        message: message,
        type: type,
        insert: "top",
        container: "top-center",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: duration,
            onScreen: true
        }
    });
}

export default Notification;