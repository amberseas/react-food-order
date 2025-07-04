import logo from '../assets/logo.jpg';
import {useContext, useRef} from 'react';
import {CartContext} from '../store/CartContext';
import Button from './UI/Button';
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
        cartDialog.current.close();
        checkoutDialog.current.open();
    }

    function handleOrderSuccess () {
        checkoutDialog.current.close();
        successDialog.current.open();
    }

    function handleCloseForm () {
        checkoutDialog.current.close();
    }

    return (
        <>
            <Cart ref={cartDialog} onCheckout={handleGoToCheckout} />
            <CheckoutForm ref={checkoutDialog} onSubmitOrder={handleOrderSuccess} onCloseForm={handleCloseForm} />
            <Success ref={successDialog} />
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