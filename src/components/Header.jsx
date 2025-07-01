import logo from '../assets/logo.jpg';
import Button from './UI/Button';
export default function Header () {
    return (
        <header id="main-header">
            <div id='title'>
                <img src={logo} alt="dishes" />
                <h1>Reactfood</h1>
            </div>
            <Button className='text-button'>Cart (0)</Button>
        </header>
    );
}