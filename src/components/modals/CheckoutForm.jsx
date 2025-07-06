import {useActionState, useContext, useRef} from "react";
import {currencyFormatter} from '../../utils/formatting.js';
import {CartContext} from "../../store/CartContext";
import {useHttp} from "../../hooks/useHttp";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Success from '../modals/Success.jsx';
import ErrorMessage from "../ErrorMessage.jsx";

const reqConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
};

export default function CheckoutForm ({ref, onCloseForm}) {
    const successDialog = useRef();

    const {items, clearCart} = useContext(CartContext);
    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const {fetchedData, error, sendRequest, clearData} = useHttp('http://localhost:3000/orders', reqConfig);

    console.log('items:', items);
    console.log('data:', fetchedData);

    const [formState, formAction, pending] = useActionState(checkoutAction);
    async function checkoutAction (prevFormState, formData) {
        const customer = Object.fromEntries(formData.entries());

        await sendRequest(
            JSON.stringify({
                order: {
                    items,
                    customer
                }
            })
        );
    }

    let actions = <>
        <Button type='button' onClick={onCloseForm} text>Close</Button>
        <Button >Submit Order</Button>
    </>;

    if (pending) {
        actions = <span>Sending order now...</span>;
    }

    function handleFinish () {
        clearCart();
        clearData();
    }

    if (fetchedData && !error) {
        onCloseForm();
        successDialog.current.open();
    }


    return (
        <>
            <Success ref={successDialog} onClose={handleFinish} />
            <Modal ref={ref}>
                <form action={formAction}>
                    <h2>Checkout</h2>
                    <p>Total Amount: {currencyFormatter.format(totalSum)}</p>
                    <Input id='name' name='name' label='Full Name' required />
                    <Input id='email' name='email' type='email' label='E-mail Address' required />
                    <Input id='street' name='street' label='Street' required />
                    <div className="control-row">
                        <Input id='postal' name='postal' label='Postal Code' required />
                        <Input id='city' name='city' label='City' required />
                    </div>
                    {error && <ErrorMessage title="Couldn't send your order.." message={error} />}
                    <p className="modal-actions">
                        {actions}
                    </p>
                </form>
            </Modal>
        </>
    );
}