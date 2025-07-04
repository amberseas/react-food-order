import {useRef, useImperativeHandle} from "react";
import {createPortal} from "react-dom";

export default function Modal ({ref, children, className = '', actions}) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open () {
                dialog.current.showModal();
            },
            close () {
                dialog.current.close();
            }
        };
    });

    return createPortal(
        <dialog ref={dialog} className={"modal " + className}>
            {children}
            <form method="dialog">
                <p className="modal-actions">
                    {actions}
                </p>
            </form>
        </dialog>,
        document.getElementById('modal')
    );
}