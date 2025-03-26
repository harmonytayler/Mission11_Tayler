import {useState} from 'react';
import BookList from '../components/BookList.tsx';
import CategoryFilter from '../components/CategoryFilter.tsx'
import CartSummary from '../components/CartSummary.tsx';

function BooksPage () {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    return (
        <div className="container mt-4">
            <CartSummary/>
            <div className="row">
                <div className="col-md-4">
                    <CategoryFilter selectedCategories={selectedCategories} setSelectedCategories={setSelectedCategories}/>
                </div>
                <div className="col-md-8">
                    <BookList selectedCategories={selectedCategories}/>
                </div>
            </div>
        </div>
    )
}

export default BooksPage;