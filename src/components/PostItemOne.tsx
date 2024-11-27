import React from "react";
import Link from "next/link";
import { PostProps } from "@/sections/Posts";
import "./postItemOne.css";

// Komponen PostItemOne untuk menampilkan item postingan
function PostItemOne({
  large,
  item,
}: {
  large: boolean;
  item: PostProps;
}) {
  return (
    <div className={`post-entry-1 ${large ? "lg" : ""}`}>
      {/* Link ke halaman detail postingan */}
      <Link href={`postitems/${item._id}`}>
        <img src={`/${item.img}`} alt={item.title} className="img-fluid" />
      </Link>
      <div className="post-meta">
        <span className="date">{item.category}</span>
        <span className="mx-1">
          <i className="bi bi-dot"></i>
        </span>
        <span>{new Date(item.date).toLocaleDateString("id-ID")}</span>
      </div>
      <h2>
        <Link href={`postitems/${item._id}`}>{item.title}</Link>
      </h2>
      {large ? (
        <>
          <p className="mb-4 d-block">{item.brief}</p>
          <div className="d-flex align-items-center author">
            <div className="photo">
              <img src={`/${item.avatar}`} alt={item.author} className="img-fluid" />
            </div>
            <div className="name">
              <h3 className="m-0 p-0">{item.author}</h3>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default PostItemOne;
