import mongoose from "mongoose";

// Definisikan skema untuk PostItem
const postItemSchema = new mongoose.Schema(
  {
    img: { type: String, required: true }, // URL gambar
    category: { type: String, required: true }, // Kategori postingan
    date: { type: Date, default: Date.now }, // Tanggal postingan
    title: { type: String, required: true }, // Judul postingan
    brief: { type: String, default: null }, // Ringkasan postingan
    avatar: { type: String, default: null }, // URL avatar penulis
    author: { type: String, default: null }, // Nama penulis
    top: { type: Boolean, default: false }, // Apakah postingan di bagian atas
    trending: { type: Boolean, default: false }, // Apakah postingan sedang trending
  },
  {
    timestamps: true, // Tambahkan createdAt dan updatedAt secara otomatis
  }
);

// Buat model PostItem jika belum ada, atau gunakan yang sudah ada
const PostItem = mongoose.models.PostItem || mongoose.model("PostItem", postItemSchema);

export default PostItem;
