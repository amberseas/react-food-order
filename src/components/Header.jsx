import logo from '../assets/logo.jpg';
import {useContext, useRef} from 'react';
import {CartContext} from '../store/CartContext';
import Button from './UI/Button';
import Modal from './Modal';
import Cart from './Cart';

export default function Header () {
    const dialog = useRef();
    const {items} = useContext(CartContext);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    function handleOpenCart () {
        dialog.current.open();
    }

    let cartModalActions = <Button text={true}>Close</Button>;
    if (totalQuantity > 0) {
        cartModalActions = (
            <>
                <Button text={true}>Close</Button>
                <Button>Go to Checkout</Button>
            </>
        );
    }

    return (
        <>
            <Modal ref={dialog} ModalComponent={Cart} actions={cartModalActions} />
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