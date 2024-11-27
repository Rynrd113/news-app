"use client";

import { PostProps } from "@/sections/Posts";
import React, { useState, useEffect } from "react";
import PostItemOne from "@/components/PostItemOne";
import Preloader from "@/components/Preloader";
import PageTitle from "@/components/PageTitle";

export default function PostItems() {
  // State untuk menyimpan daftar item postingan
  const [items, setItems] = useState<PostProps[]>([]);

  // Fungsi untuk mengambil data semua postingan
  const getItemsData = () => {
    fetch(`/api/postitems`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((e) => console.log(e.message));
  };

  // Mengambil data postingan saat komponen pertama kali dirender
  useEffect(() => {
    getItemsData();
  }, []);

  return (
    <main id="main">
      <section id="posts" className="posts">
        <div className="container">
          <div className="row">
            {/* Komponen judul halaman */}
            <PageTitle title="Posts Items List" />
            {/* Jika ada item, tampilkan daftar item */}
            {items && items.length > 0 ? (
              items.map((item: PostProps) => (
                <div className="col-lg-3 col-md-6" key={item._id}>
                  <PostItemOne large={false} item={item} />
                </div>
              ))
            ) : (
              // Jika tidak ada item, tampilkan preloader
              <Preloader />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
