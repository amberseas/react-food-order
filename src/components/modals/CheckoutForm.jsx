import {useActionState} from "react";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

function checkoutAction (prevFormState, formData) {
    const user = {
        name: formData.get('name'),
        email: formData.get('email'),
        street: formData.get('street'),
        postal: formData.get('postal'),
        city: formData.get('city')
    };
    let errors = [];

    if (!user.email.includes('@')) errors.push('Invalid email address.');
    if (user.name.trim() === '') errors.push('Name cannot be empty.');
    if (user.street.trim() === '') errors.push('Street cannot be empty.');
    if (user.postal.trim() === '') errors.push('Postal code cannot be empty.');
    if (user.city.trim() === '') errors.push('City cannot be empty.');

    if (errors.length > 0) {
        return {
            errors,
            user
        };
    }

    return {
        errors: null
    };
}

export default function CheckoutForm ({ref, onSubmitOrder, onCloseForm}) {
    const [formState, formAction] = useActionState(checkoutAction, {errors: null});
    return (
        <Modal ref={ref}>
            <form action={formAction} onSubmit={onSubmitOrder}>
                <h2>Checkout</h2>
                <p>Total Amount: $7.99</p>
                <Input id='name' name='name' label='Full Name' required />
                <Input id='email' name='email' type='email' label='E-mail Address' required />
                <Input id='street' name='street' label='Street' required />
                <div className="control-row">
                    <Input id='postal' name='postal' label='Postal Code' required />
                    <Input id='city' name='city' label='City' required />
                </div>
                <p className="modal-actions">
                    <Button type='button' onClick={onCloseForm} text>Close</Button>
                    <Button >Submit Order</Button>
                </p>
            </form>
        </Modal>
    );
}