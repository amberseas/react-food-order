import {useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";

export default function Modal ({ref, ModalComponent, actions}) {
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
                {actions}
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}