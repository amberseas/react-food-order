import Input from "../UI/Input";

export default function CheckoutForm () {
    return (

        <form action="">
            <h2>Checkout</h2>
            <p>Total Amount: $7.99</p>
            <Input id='name' name='full-name' label='Full Name' required />
            <Input id='email' name='email' type='email' label='E-mail Address' required />
            <Input id='street' name='street' label='Street' required />
            <div className="control-row">
                <Input id='postal' name='postal' label='Postal Code' required />
                <Input id='city' name='city' label='City' required />
            </div>
        </form>

    );
}