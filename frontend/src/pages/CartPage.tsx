import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function CartPage() {
    const navigate = useNavigate();
    const { cart, removeFromCart } = useCart();

    // Calculate the total price of all books in the cart
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    return (
        <div>
            <h2>Your Cart</h2>
            <div>
                {cart.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <ul>
                        {cart.map((item: CartItem) => (
                            <li key={item.bookId}>
                                {item.title}: ${item.price.toFixed(2)} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                                <button onClick={() => removeFromCart(item.bookId)}>Remove</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <button>Checkout</button>
            <button onClick={() => navigate('/books')}>Continue Shopping</button>
        </div>
    );
}

export default CartPage;
