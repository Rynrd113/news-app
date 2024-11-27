"use client";

import { initialPost, PostProps } from "@/sections/Posts";
import React, { useState, useEffect } from "react";
import Image from "next/image"; // Import komponen 'Image' dari paket yang benar
import Preloader from "@/components/Preloader";
import "./style.css";
import SidePostItem from "@/components/SidePostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PostItem({ params }: { params: { id: string } }) {
  const id: string = params.id;
  const router = useRouter();
  const [item, setItem] = useState<PostProps>(initialPost);
  const [items, setItems] = useState<PostProps[]>([]);
  const [tabs, setTabs] = useState([
    { id: 1, name: "Popular", active: true },
    { id: 2, name: "Trending", active: false },
  ]);

  // Fungsi untuk mengubah tab yang aktif
  const handleTabActive = (id: number): void => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => ({
        ...tab,
        active: tab.id === id,
      }))
    );
  };

  // Fungsi untuk mengambil data post tunggal berdasarkan ID
  const getSinglePostData = async () => {
    try {
      const res = await fetch(`/api/postitems/${id}`);
      const data = await res.json();
      setItem(data);
    } catch (e) {
      console.log((e as any).message);
    }
  };

  // Fungsi untuk mengambil data semua post
  const getItemsData = async () => {
    try {
      const res = await fetch(`/api/postitems`);
      const data = await res.json();
      setItems(data);
    } catch (e) {
      console.log((e as Error).message);
    }
  };

  // Mengambil data post saat komponen pertama kali dirender
  useEffect(() => {
    getSinglePostData();
    getItemsData();
  }, [id]);

  // Fungsi untuk menghapus postingan berdasarkan ID
  const handleDeletePost = async (id: string) => {
    try {
      const response = await fetch(`/api/postitems/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = response.status;
      if (result === 200) {
        console.log("Success:", result);
        router.push(`/postitems`);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              {item && item.category ? (
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{item.category}</span>
                    <span className="mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span>
                      {new Date(item.date).toLocaleDateString("id-ID")}
                    </span>
                  </div>

                  <h1 className="mb-5">{item.title}</h1>
                  <p>
                    <span className="firstcharacter">
                      {item.brief?.charAt(0)}
                    </span>
                    {item.brief?.substring(1)}
                  </p>

                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vero temporibus repudiandae, inventore pariatur numquam
                    cumque possimus exercitationem? Nihil tempore odit ab minus
                    eveniet praesentium, similique blanditiis molestiae ut saepe
                    perspiciatis officia nemo, eos quae cumque. Accusamus fugiat
                    architecto rerum animi atque eveniet, quo, praesentium
                    dignissimos
                  </p>

                  <figure className="my-4">
                    <Image
                      src={`/${item.img}`}
                      alt=""
                      className="img-fluid"
                      width={800}
                      height={600}
                    />
                  </figure>
                  <figcaption>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  </figcaption>
                  <p>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Vero temporibus repudiandae, inventore pariatur numquam
                    cumque possimus exercitationem? Nihil tempore odit ab minus
                    eveniet praesentium, similique blanditiis molestiae ut saepe
                    perspiciatis officia nemo, eos quae cumque. Accusamus fugiat
                    architecto rerum animi atque eveniet, quo, praesentium
                    dignissimos
                  </p>
                  <div className="d-flex justify-content-center gap-4">
                    <a
                      className="btn btn-primary"
                      onClick={() => handleDeletePost(id)}
                    >
                      <i className="bi bi-trash"></i>
                    </a>
                    <Link
                      href={`/createpostitem/${id}`}
                      className="btn btn-primary"
                    >
                      <i className="bi bi-pen"></i>
                    </Link>
                  </div>
                </div>
              ) : (
                <Preloader />
              )}
            </div>

            <div className="col-3">
              <div className="aside-block">
                <ul className="nav nav-pills custom-tab-nav mb-4">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${tab.active ? "active" : ""}`}
                        onClick={() => handleTabActive(tab.id)}
                      >
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      tabs[0].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(0, 6).map((item) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                  <div
                    className={`tab-pane fade ${
                      tabs[1].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(6, 12).map((item) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="aside-block">
                <h3 className="aside-title">Video</h3>
                <div className="video-post">
                  <a
                    target="_blank"
                    href="https://youtu.be/OfZu2_z3QPY?feature=shared"
                    className="link-video"
                  >
                    <span className="bi bi-play-fill"></span>
                    <Image
                      src="/assets/img/post-landscape-3.jpg"
                      alt=""
                      className="img-fluid"
                      width={800}
                      height={600}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}