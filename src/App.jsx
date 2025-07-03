import CartModal from "./components/modals/Modal";
import Header from "./components/Header";
import Meals from "./components/Meals";
import CartContextProvider from "./store/CartContext";
import CheckoutForm from "./components/modals/CheckoutForm";

function App () {
  return (
    <CartContextProvider>
      <Header />
      <Meals />
      <CheckoutForm />
    </CartContextProvider>
  );
}

export default App;
