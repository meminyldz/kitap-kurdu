import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBook, updateBook, deleteBook, selectBook } from "../feature/books/bookSlice.js";
import { logout } from "../feature/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { searchBook } from "../services/bookService";
import { toast } from "react-toastify";

export default function BookForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { books, selectedBook } = useSelector((state) => state.books);
  const user = useSelector(state => state.auth.user);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [results, setResults] = useState([]);

  const [form, setForm] = useState({
    id: null,
    title: "",
    author: "",
    category: "Tüm Kitaplar",
  });


  useEffect(() => {
    if (selectedBook) {
      setForm(selectedBook);
    }
  }, [selectedBook]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form", form);
    if (!form.title || !form.author) return;

    if (form.id) {
      dispatch(updateBook(form));
    } else {
      dispatch(addBook({ ...form, id: Date.now() }));
    }

    setForm({ id: null, title: "", author: "", category: "Tüm Kitaplar" });
  };

  const handleEdit = (book) => {
    dispatch(selectBook(book));
  };

  const handleDelete = (id) => {
    dispatch(deleteBook(id));
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login")
  };

  const handleSearch = async () => {
    console.log("handleSearch");
  if (!form.title) {
    toast.error("Kitap adı gir");
    return;
  }

  try {
    const data = await searchBook(form.title, form.author);

    setResults(data || []);

    // ✅ güvenli erişim
    const firstAuthor =
      data?.[0]?.volumeInfo?.authors?.[0];

    if (firstAuthor) {
      setForm({ ...form, author: firstAuthor });
      toast.success("Yazar otomatik dolduruldu ✍️");
    } else {
      toast.info("Yazar bilgisi bulunamadı");
    }

  } catch (error) {
    toast.error("API hatası");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          📚 Kitap Ekle / Güncelle
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            type="text"
            name="title"
            placeholder="Kitap Adı"
            value={form.title}
            onChange={handleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="text"
            name="author"
            placeholder="Yazar"
            value={form.author}
            onChange={handleChange}
            className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="p-2 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option>Tüm Kitaplar</option>
            <option>Doğa ve Bilim</option>
            <option>Yaşam öyküsü - Anı</option>
            <option>Tarih</option>
            <option>Din</option>
            <option>Polisiye-Gerilim</option>
            <option>Sağlık</option>
            <option>Müzik</option>
          </select>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3"
          >
            Kitap Ara
          </button>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition">
            {form.id ? "Güncelle" : "Ekle"}
          </button>
        </form>

        <h3 className="text-xl font-semibold mt-8 mb-4">📖 Kitap Listesi</h3>

        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="p-4 border rounded-xl flex justify-between items-center shadow-sm hover:shadow-md transition"
            >
              <div>
                <p className="font-bold text-lg">{book.title}</p>
                <p className="text-sm text-gray-500">
                  {book.author} • {book.category}
                </p>
              </div>

              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-lg"
                >
                  Düzenle
                </button>

                <button
                  onClick={() => handleDelete(book.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
                >
                  Sil
                </button>

              </div>
            </li>
          ))}
        </ul>
      </div>
      {user.role === "admin" && (
        <button className="bg-green-500 text-white px-3 py-1">
          Admin İşlemi
        </button>
      )}
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-3 py-1"
      >
        Çıkış Yap
      </button>
      
    </div>
  );
}
