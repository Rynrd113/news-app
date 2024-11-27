"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./posts.css";
import PostItemOne from "@/components/PostItemOne";
import TrendingPost from "@/components/TrendingPost";
import Preloader from "@/components/Preloader";

export interface PostProps {
  _id: string;
  img: string;
  category: string;
  date: string;
  title: string;
  brief: string;
  avatar: string;
  author: string;
  trending?: boolean;
  top?: boolean;
}

export const initialPost: PostProps = {
  _id: "",
  img: "",
  category: "",
  date: "",
  title: "",
  brief: "",
  avatar: "",
  author: "",
};

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<PostProps[]>([]);
  const [item, setItem] = useState<PostProps>(initialPost);

  const fetchData = async (url: string, callback: (data: any) => void) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) router.push("/not-found");
        return;
      }
      const data = await res.json();
      callback(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData("/api/postitems", setItems);
    fetchData("/api/postitems/66de819f8d267d75550c9d86", setItem);
  }, []);

  const renderPosts = (
    filterFn: (item: PostProps) => boolean,
    sliceStart: number
  ) =>
    items
      .filter(filterFn)
      .slice(sliceStart, sliceStart + 3)
      .map((item) => <PostItemOne key={item._id} large={false} item={item} />);

  return (
    <section id="posts" className="posts">
      <div className="container" data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            {item._id ? (
              <PostItemOne large={true} item={item} />
            ) : (
              <Preloader />
            )}
          </div>
          <div className="col-lg-8">
            <div className="row g-5">
              {Array.from({ length: 2 }, (_, i) => (
                <div
                  key={i}
                  className={`col-lg-4 ${
                    i !== 0 ? "border-start custom-border" : ""
                  }`}
                >
                  {items.length ? (
                    renderPosts((item) => !item.trending && !item.top, i * 3)
                  ) : (
                    <Preloader />
                  )}
                </div>
              ))}
              <div className="col-lg-4">
                <div className="trending">
                  <h3>Trending</h3>
                  <ul className="trending-post">
                    {items.length ? (
                      items
                        .filter((item) => item.trending)
                        .map((item, index) => (
                          <TrendingPost
                            key={item._id}
                            index={index}
                            item={item}
                          />
                        ))
                    ) : (
                      <Preloader />
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
