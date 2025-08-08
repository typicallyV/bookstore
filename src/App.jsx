import React, { useState } from "react";
import "./bookstore.css";

const sampleBooks = [
  { id: 1, title: "EVERYONE HAVE A STORY", author: "SAVI SHARMA", price: 9.99 },
  { id: 2, title: "METAMORPHOSIS", author: "FRANZ KAFKA", price: 14.5 },
  { id: 3, title: "PELICAN CITY", author: "PG WOODEHOUSE", price: 7.25 },
];

export default function App() {
  const [books, setBooks] = useState(sampleBooks);
  const [wishlist, setWishlist] = useState([]);
  const [form, setForm] = useState({ title: "", author: "", price: "" });

  const addBook = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.price) return;
    const newBook = {
      id: Date.now(),
      title: form.title,
      author: form.author,
      price: parseFloat(form.price),
    };
    setBooks([newBook, ...books]);
    setForm({ title: "", author: "", price: "" });
  };

  const removeBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
  };

  const addToWishlist = (book) => {
    setWishlist([...wishlist, { ...book, wishId: Date.now() }]);
  };

  const removeFromWishlist = (wishId) => {
    setWishlist(wishlist.filter((w) => w.wishId !== wishId));
  };

  const clearWishlist = () => setWishlist([]);

  const wishlistTotal = wishlist.reduce(
    (sum, b) => sum + (b.price || 0),
    0
  );

  return (
    <div className="container">
      <header>INDIAN Bookstore</header>

      {/* Main Panel */}
      <div className="panel">
        <h2>Add a New Book</h2>
        <form onSubmit={addBook}>
          <input
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <input
            placeholder="Author"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <button type="submit" className="add-btn">Add</button>
        </form>

        <h2>Book List</h2>
        <ul className="book-list">
          {books.map((book) => (
            <li key={book.id}>
              <div className="book-image">Image</div>
              <div>
                <div><strong>{book.title}</strong> by {book.author}</div>
                <div>₹{book.price.toFixed(2)}</div>
              </div>
              <button
                className="wishlist-btn"
                onClick={() => addToWishlist(book)}
              >
                + Wishlist
              </button>
              <button
                className="delete-btn"
                onClick={() => removeBook(book.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Wishlist Panel */}
      <div className="panel">
        <h2>💜 Wishlist</h2>
        {wishlist.map((w) => (
          <div className="wishlist-item" key={w.wishId}>
            <div className="wishlist-image">Img</div>
            <div>
              <div><strong>{w.title}</strong> by {w.author}</div>
              <div>₹{w.price.toFixed(2)}</div>
            </div>
            <button
              className="delete-btn"
              onClick={() => removeFromWishlist(w.wishId)}
            >
              Remove
            </button>
          </div>
        ))}

        <div className="total">Total: ₹{wishlistTotal.toFixed(2)}</div>
        <button className="clear-btn" onClick={clearWishlist}>
          Clear Wishlist
        </button>
      </div>
    </div>
  );
}
