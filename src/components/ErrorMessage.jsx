import Modal from "./UI/Modal";
import Button from "./UI/Button";

export default function ErrorMessage ({ref, title, message, onConfirm}) {
    return (
        <Modal ref={ref} className="error">
            <h2>{title}</h2>
            <p>{message}</p>
            <p className="modal-actions">
                <Button onClick={onConfirm} text>Okay</Button>
            </p>
        </Modal>
    );
}