import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import {fetchBooks} from "../api/BooksAPI";
import Pagination from "./Pagination";

function BookList({ selectedCategories}: {selectedCategories: string[]}) {

    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [sortBy, setSortBy] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const loadBooks = async () => {
            try { 
                setLoading(true);
                const data = await fetchBooks(pageSize, pageNum, sortBy, selectedCategories);

                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();

    }, [pageSize, pageNum, sortBy, selectedCategories]);

    if (loading) return <p>Loading books...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <>
            <h1>Books for Sale</h1>
            <br />
            {books.map((b) => {
                return (
                    <div id="bookCard" className="card p-3 border-0 shadow-sm hover-shadow" key={b.bookId}>
                        <h3 className="card-title">{b.title}</h3>
                        <div className="card-body">
                            <ul className="list-unstyled">
                                <li><strong>Author:</strong> {b.author}</li>
                                <li><strong>Publisher:</strong> {b.publisher}</li>
                                <li><strong>ISBN:</strong> {b.isbn}</li>
                                <li><strong>Classification:</strong> {b.classification}</li>
                                <li><strong>Category:</strong> {b.category}</li>
                                <li><strong>Page Count:</strong> {b.pageCount}</li>
                                <li><strong>Price:</strong> ${b.price}</li>
                            </ul>

                            <button className='btn btn-success'
                            onClick={() => navigate(`/purchase/${b.title}/${b.bookId}/${b.price}`)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                );
            })}

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={setPageNum}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
            
            <label>
                Sort by:
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                    <option value="">None</option>
                    <option value="title">Title</option>
                </select>
            </label>
        </>
    );
}

export default BookList;