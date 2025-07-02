import {useContext, useRef} from 'react';
import logo from '../assets/logo.jpg';
import Button from './UI/Button';
import {CartContext} from '../store/CartContext';
import CartModal from './CartModal';

export default function Header () {
    const dialog = useRef();
    const {items} = useContext(CartContext);
    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);
    function handleOpenCart () {
        dialog.current.open();
    }
    return (
        <>
            <CartModal ref={dialog} />
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