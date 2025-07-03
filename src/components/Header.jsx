import logo from '../assets/logo.jpg';
import {useContext, useRef} from 'react';
import {CartContext} from '../store/CartContext';
import Button from './UI/Button';
import Modal from './modals/Modal';
import Cart from './modals/Cart';
import CheckoutForm from './modals/CheckoutForm';
import Success from './modals/Success';

export default function Header () {
    const cartDialog = useRef();
    const checkoutDialog = useRef();
    const successDialog = useRef();
    const {items} = useContext(CartContext);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    function handleOpenCart () {
        cartDialog.current.open();
    }

    function handleGoToCheckout () {
        checkoutDialog.current.open();
    }

    function handleOrderSuccess () {
        successDialog.current.open();
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
            <Button onClick={handleOrderSuccess}>Submit Order</Button>
        </>
    );
    let successActions = <Button>Okay</Button>;

    return (
        <>
            <Modal ref={cartDialog} ModalComponent={Cart} actions={cartModalActions} />
            <Modal ref={checkoutDialog} ModalComponent={CheckoutForm} actions={checkoutModalActions} />
            <Modal ref={successDialog} ModalComponent={Success} actions={successActions} />
            <header id="main-header">
                <div id='title'>
                    <img src={logo} alt="dishes" />
                    <h1>Reactfood</h1>
                </div>
                <nav>
                    <Button onClick={handleOpenCart} text>Cart ({totalQuantity})</Button>
                </nav>
            </header>
        </>
    );
}