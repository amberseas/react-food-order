import logo from '../assets/logo.jpg';
import {useContext, useRef} from 'react';
import {CartContext} from '../store/CartContext';
import Button from './UI/Button';
import Modal from './Modal';
import Cart from './Cart';
import CheckoutForm from './CheckoutForm';

export default function Header () {
    const cartDialog = useRef();
    const checkoutDialog = useRef();
    const {items} = useContext(CartContext);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    function handleOpenCart () {
        cartDialog.current.open();
    }

    function handleGoToCheckout () {
        checkoutDialog.current.open();
    }

    const closeBtn = <Button text={true}>Close</Button>;
    let cartModalActions = closeBtn;
    if (totalQuantity > 0) {
        cartModalActions = (
            <>
                {closeBtn}
                <Button onClick={handleGoToCheckout}>Go to Checkout</Button>
            </>
        );
    }
    let checkoutModalActions = (
        <>
            {closeBtn}
            <Button>Submit Order</Button>
        </>
    );

    return (
        <>
            <Modal ref={cartDialog} ModalComponent={Cart} actions={cartModalActions} />
            <Modal ref={checkoutDialog} ModalComponent={CheckoutForm} actions={checkoutModalActions} />
            <header id="main-header">
                <div id='title'>
                    <img src={logo} alt="dishes" />
                    <h1>Reactfood</h1>
                </div>
                <Button onClick={handleOpenCart} text>Cart ({totalQuantity})</Button>
            </header>
        </>
    );
}