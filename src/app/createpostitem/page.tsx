'use client';

import React, { useState, useEffect } from "react";
import AOS from "aos"; // Import AOS untuk animasi

export default function CreatePostItem() {
  // Inisialisasi AOS untuk animasi
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
      mirror: false,
    });
  }, []);

  // State awal untuk form input
  const initialState = {
    title: "",
    img: "",
    category: "",
    author: "",
    brief: "",
    validate: "",
  };

  const [text, setText] = useState(initialState);

  // Fungsi untuk menangani perubahan teks pada input
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setText({ ...text, [name]: value, validate: "" });
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Validasi form sederhana
    if (text.title === "" || text.img === "" || text.category === "" || text.brief === "") {
      setText({ ...text, validate: "incomplete" });
      return;
    }

    // Mengirim permintaan POST untuk membuat postingan baru
    try {
      const response = await fetch("/api/postitems", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(text),
      });

      setText({ ...text, validate: "loading" });

      const result = response.status;
      if (result === 201) {
        setText({ ...text, validate: "success" });
        console.log("Success:", result);
      }
    } catch (error) {
      setText({ ...text, validate: "error" });
      console.error("Error:", error);
    }
  };

  return (
    <main id="main">
      <section className="create-post-content">
        <div className="container" data-aos="fade-up">
          <div className="row d-flex justify-content-center">
            <div className="col-lg-10">
              <div className="row d-flex justify-content-center mt-5">
                <div className="col-lg-12">
                  <div className="row">
                    <div className="col-lg-12 text-center mb-5">
                      <h1 className="page-title">Buat Postingan Baru</h1>
                    </div>
                  </div>
                  <form onSubmit={handleFormSubmit}>
                    <div className="row">
                      <div className="col-lg-6 mb-3">
                        <label>Judul</label>
                        <input
                          type="text"
                          name="title"
                          value={text.title}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Judul"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>URL Gambar</label>
                        <input
                          type="text"
                          name="img"
                          value={text.img}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan URL Gambar"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Kategori</label>
                        <input
                          type="text"
                          name="category"
                          value={text.category}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Kategori Postingan"
                        />
                      </div>
                      <div className="col-lg-6 mb-3">
                        <label>Penulis</label>
                        <input
                          type="text"
                          name="author"
                          value={text.author}
                          onChange={handleTextChange}
                          className="form-control"
                          placeholder="Masukkan Nama Penulis"
                        />
                      </div>
                      <div className="col-12 mb-3">
                        <label>Ringkasan</label>
                        <textarea
                          className="form-control"
                          name="brief"
                          value={text.brief}
                          onChange={handleTextChange}
                          placeholder="Masukkan Ringkasan Postingan"
                          cols={30}
                          rows={10}
                        ></textarea>
                      </div>
                      <div className="mb-3">
                        {text.validate === "loading" && <div className="loading">Mengirim Postingan</div>}
                        {text.validate === "incomplete" && (
                          <div className="error-message">Harap lengkapi semua detail di atas.</div>
                        )}
                        {text.validate === "success" && (
                          <div className="sent-message">Berita Anda berhasil diposting. Terima kasih!</div>
                        )}
                        {text.validate === "error" && <div className="error-message">Server Error</div>}
                      </div>
                      <div className="col-12 d-flex justify-content-center">
                        <input type="submit" className="btn btn-primary" value="Posting" />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div> 
          </div>
        </div>
      </section>
    </main>
  );
}
