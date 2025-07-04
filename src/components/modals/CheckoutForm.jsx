import {useActionState, useContext} from "react";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import {CartContext} from "../../store/CartContext";
import {currencyFormatter} from '../../utils/formatting.js';
import {useHttp} from "../../hooks/useHttp";

export default function CheckoutForm ({ref, onSubmitOrder, onCloseForm}) {
    const {items} = useContext(CartContext);
    const totalSum = items.reduce((total, item) => total + item.price * item.quantity, 0);

    const [formState, formAction] = useActionState(checkoutAction, {errors: null, isFetching: false});
    async function checkoutAction (prevFormState, formData) {
        const customer = {
            name: formData.get('name'),
            email: formData.get('email'),
            street: formData.get('street'),
            postal: formData.get('postal'),
            city: formData.get('city')
        };
        let errors = [];

        if (!customer.email.includes('@')) errors.push('Invalid email address.');
        if (customer.name.trim() === '') errors.push('Name cannot be empty.');
        if (customer.street.trim() === '') errors.push('Street cannot be empty.');
        if (customer.postal.trim() === '') errors.push('Postal code cannot be empty.');
        if (customer.city.trim() === '') errors.push('City cannot be empty.');

        if (errors.length > 0) {
            return {
                errors,
                customer
            };
        }

        const response = await fetch('http://localhost:3000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                order: {
                    items,
                    customer
                }
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order details.');
        }

        return {
            errors: null
        };
    }
    return (
        <Modal ref={ref}>
            {formState.isFetching && <p className="center">Loading...</p>}
            <form action={formAction} onSubmit={onSubmitOrder}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(totalSum)}</p>
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