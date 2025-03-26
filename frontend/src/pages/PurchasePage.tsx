import { useNavigate, useParams } from 'react-router-dom';
import { useState } from 'react'; // Import useState for managing quantity
import { useCart } from '../context/CartContext.tsx';
import { CartItem } from '../types/CartItem.ts';

function PurchasePage() {
    const navigate = useNavigate();
    const { title = '', bookId, price = '0' } = useParams();
    const { addToCart } = useCart();

    // State to handle the quantity
    const [quantity, setQuantity] = useState<number>(1);

    // Handle quantity change
    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = Math.max(1, parseInt(event.target.value, 10)); // Ensure quantity is at least 1
        setQuantity(newQuantity);
    };

    const handleAddToCart = () => {
        const newItem: CartItem = {
            bookId: Number(bookId),
            title,
            price: Number(price),
            quantity: quantity // Use the quantity from state
        };
        addToCart(newItem);
        navigate('/cart');
    };

    return (
        <>
            <h2>Purchase {title}</h2>
            <div>
                <p><strong>${Number(price).toFixed(2)}</strong></p>

                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>

            <button onClick={() => navigate(-1)}>Go Back</button>
        </>
    );
}

export default PurchasePage;
