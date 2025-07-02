import {useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";
import Button from "./UI/Button";

export default function Modal ({ref, ModalComponent, buttonText}) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className="modal">
            <ModalComponent />
            <form className="modal-actions" method="dialog">
                <Button text={true}>Close</Button>
                <Button>{buttonText}</Button>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}