import dbConnect from "../../../../../config/db";
import PostItem from "../../../../../models/PostItem";

// Koneksi ke database
dbConnect();

// Fungsi GET untuk mendapatkan item berdasarkan ID
export async function GET(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Mencari item berdasarkan ID dan menghilangkan field __v
    const postItem = await PostItem.findById(params.id).select("-__v");
    if (!postItem) {
      return new Response(
        JSON.stringify({ message: "Item tidak ditemukan untuk ID ini" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(postItem), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}

// Fungsi PUT untuk memperbarui item berdasarkan ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Mendapatkan data yang diperbarui dari request body
    const updatedItem = await request.json();
    // Memperbarui item berdasarkan ID
    const postItem = await PostItem.findByIdAndUpdate(params.id, updatedItem, {
      new: true,
    });
    if (!postItem) {
      return new Response(
        JSON.stringify({ message: "Item tidak ditemukan untuk ID ini" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(postItem), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}

// Fungsi DELETE untuk menghapus item berdasarkan ID
export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Menghapus item berdasarkan ID
    const postItem = await PostItem.findByIdAndDelete(params.id);
    if (!postItem) {
      return new Response(
        JSON.stringify({ message: "Item tidak ditemukan untuk ID ini" }),
        { status: 404 }
      );
    }
    return new Response(JSON.stringify(postItem), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Terjadi kesalahan server" }),
      { status: 500 }
    );
  }
}
