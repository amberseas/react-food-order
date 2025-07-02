import Input from "./UI/Input";

export default function CheckoutForm () {
    return (
        <div className="cart">
            <h2>Checkout</h2>
            <p>Total Amount: $7.99</p>
            <form action="">
                <div className="control-row">
                    <Input id='name' name='full-name' label='Full Name' />
                </div>
            </form>
        </div>
    );
}