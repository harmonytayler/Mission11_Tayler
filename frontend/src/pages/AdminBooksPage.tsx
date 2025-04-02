import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const AdminBooksPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [pageSize, setPageSize] = useState<number>(5);
    const [pageNum, setPageNum] = useState<number>(1);
    const [sortBy, setSortBy] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const data = await fetchBooks(pageSize, pageNum, sortBy, []);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize))
            } catch (error) {
                setError((error as Error).message);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, [pageSize, pageNum, sortBy]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm("Are you sure?");
        if (!confirmDelete) return;

        try {
            await deleteBook(bookId);
            setBooks(books.filter((b) => b.bookId !== bookId))
        } catch (error) {
            alert("Failed to delete book.");
        }
    };

    if (loading) return <p>Loading books...</p>
    if(error) return <p>Error: {error}</p>

    return (
        <div>
            <h1>Admin - Books</h1>

            {!showForm && (
                <button className="btn btn-success mb-3" onClick={() => setShowForm(true)}>Add Book</button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageSize, pageNum, sortBy, []).then(data => setBooks(data.books));
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageSize, pageNum, sortBy, []).then(data => setBooks(data.books));
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <table className="table table-bordered table-striped">
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Classification</th>
                        <th>Category</th>
                        <th>Page Count</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        books.map((b) => (
                            <tr key={b.bookId}>
                                <td>{b.bookId}</td>
                                <td>{b.title}</td>
                                <td>{b.author}</td>
                                <td>{b.publisher}</td>
                                <td>{b.isbn}</td>
                                <td>{b.classification}</td>
                                <td>{b.category}</td>
                                <td>{b.pageCount}</td>
                                <td>{b.price}</td>
                                <td>
                                    <button
                                        className="btn btn-primary btn-sm w-100 mb-1"
                                        onClick={() => setEditingBook(b)}>Edit</button>
                                    <button 
                                        className="btn btn-danger btn-sm w-100 mb-1"
                                        onClick={() => handleDelete(b.bookId)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

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
        </div>
    )
};

export default AdminBooksPage;