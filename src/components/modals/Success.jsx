import Modal from "../UI/Modal";
import Button from "../UI/Button";

export default function Success ({ref}) {
    return (
        <Modal ref={ref}>
            <h2>Success!</h2>
            <p>Your order was submitted successfully.</p>
            <p>We will get back to you with more details via email within the next few minutes.</p>
            <form method="dialog">
                <p className="modal-actions">
                    <Button>Okay</Button>
                </p>
            </form>
        </Modal>);
}