import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import '../components/css/CartSummary.css'; 

const CartSummary = () => {
    const navigate = useNavigate();
    const { cart } = useCart();

    // Calculate the total price, accounting for quantity
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div 
            className="cart-summary"
            onClick={() => navigate('/cart')}
        >
            🛒 <span>Total: <strong>${totalAmount.toFixed(2)}</strong></span>
        </div>
    );
}

export default CartSummary;
