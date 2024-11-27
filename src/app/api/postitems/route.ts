import dbConnect from "../../../../config/db";
import PostItem from "../../../../models/PostItem";

// Koneksi ke database
dbConnect();

// Fungsi GET untuk mendapatkan semua item
export async function GET() {
  try {
    // Mencari semua item dan menghilangkan field __v
    const postItems = await PostItem.find().select("-__v");
    return new Response(JSON.stringify(postItems), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), {
      status: 500,
    });
  }
}

// Fungsi POST untuk membuat item baru
export async function POST(request: Request) {
  try {
    // Mendapatkan data dari request body
    const postItems = await request.json();
    // Menyimpan item baru ke database
    const savedItem = await new PostItem({ ...postItems }).save();
    return new Response(JSON.stringify(savedItem), {
      headers: { "Content-Type": "application/json" },
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: "Terjadi kesalahan server" }), {
      status: 500,
    });
  }
}
